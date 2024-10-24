using LearnHub.Data.Database;
using LearnHub.Data.Domain;
using LearnHub.Server.Dtos;
using LearnHub.Server.Helpers;
using Microsoft.EntityFrameworkCore;

namespace LearnHub.Server.Repositories
{
	public class UserRepository : IUserRepository
	{
		private readonly LearnDbContext _dbContext;
		private readonly IPasswordHasher _passwordHasher;

		private static UserInfoDto ToUserInfoDto(User user) => new()
		{
			Id = user.Id,
			FirstName = user.FirstName,
			LastName = user.LastName,
			Role = user.Role,
		};

		private static CourseInfoDto ToCourseInfoDto(Course course) => new()
		{
			Id = course.Id,
			Title = course.Title,
			Description = course.Description,
			Instructor = ToUserInfoDto(course.Instructor),
		};

		private User ToUser(UserRegistrationDto userRegistrationDto) => new()
		{
			FirstName = userRegistrationDto.FirstName,
			LastName = userRegistrationDto.LastName,
			UserName = userRegistrationDto.UserName,
			PasswordHash = _passwordHasher.Hash(userRegistrationDto.Password)
		};

		public UserRepository(LearnDbContext dbContext, IPasswordHasher passwordHasher)
		{
			_dbContext = dbContext;
			_passwordHasher = passwordHasher;
		}

		public async Task<List<UserInfoDto>> GetAllAsync()
		{
			var users = await _dbContext.Users.ToListAsync();
			return users.Select(ToUserInfoDto).ToList();
		}
		public async Task<List<UserInfoDto>> GetByRoleAsync(Role role)
		{
			return await _dbContext.Users
				.Where(u => u.Role == role)
				.Select(u => ToUserInfoDto(u))
				.ToListAsync();
		}

		public async Task<UserInfoDto?> GetByIdAsync(int id)
		{
			return await _dbContext.Users
				.Where(u => u.Id == id)
				.Select(u => ToUserInfoDto(u))
				.FirstOrDefaultAsync()
				is UserInfoDto userInfo ? userInfo : null;
		}

		public async Task<List<CourseInfoDto>?> GetCoursesForUserAsync(int id)
		{
			return await _dbContext.Users
				.Include(u => u.Courses)
				.ThenInclude(c => c.Instructor)
				.Where(u => u.Id == id)
				.FirstOrDefaultAsync()
				is User user
				? user.Courses.Select(c => ToCourseInfoDto(c)).ToList()
				: null;
		}

		public async Task<UserInfoDto> AddAsync(UserRegistrationDto userRegistrationDto)
		{
			User user = ToUser(userRegistrationDto);
			_dbContext.Users.Add(user);
			await _dbContext.SaveChangesAsync();

			return ToUserInfoDto(user);
		}

		public async Task<bool> UpdatePasswordAsync(int id, string password)
		{
			string hash = _passwordHasher.Hash(password);
			int count = await _dbContext.Users
				.Where(user => user.Id == id)
				.ExecuteUpdateAsync(setters => setters
					.SetProperty(u => u.PasswordHash, hash));
			return count > 0;
		}

		public async Task<bool> UpdateRoleAsync(int id, Role role)
		{
			int count = await _dbContext.Users
				.Where(user => user.Id == id)
				.ExecuteUpdateAsync(setters => setters
					.SetProperty(u => u.Role, role));
			return count > 0;
		}

		public async Task<bool> DeleteAsync(int id)
		{
			int count = await _dbContext.Users
				.Where(user => user.Id == id)
				.ExecuteDeleteAsync();

			return count > 0;
		}

	}

	public interface IUserRepository
	{
		Task<List<UserInfoDto>> GetAllAsync();

		Task<List<UserInfoDto>> GetByRoleAsync(Role role);

		Task<UserInfoDto?> GetByIdAsync(int id);

		Task<List<CourseInfoDto>?> GetCoursesForUserAsync(int id);

		Task<UserInfoDto> AddAsync(UserRegistrationDto userRegistrationDto);

		Task<bool> UpdatePasswordAsync(int id, string password);

		Task<bool> UpdateRoleAsync(int id, Role role);

		Task<bool> DeleteAsync(int id);
	}
}
