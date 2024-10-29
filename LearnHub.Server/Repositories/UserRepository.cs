using AutoMapper;
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
		private readonly IMapper _mapper;

		public UserRepository(LearnDbContext dbContext, IPasswordHasher passwordHasher, IMapper mapper)
		{
			_dbContext = dbContext;
			_passwordHasher = passwordHasher;
			_mapper = mapper;
		}

		public async Task<List<UserInfoDto>> GetAllAsync()
		{
			return await _dbContext.Users
				.Select(u => _mapper.Map<UserInfoDto>(u))
				.ToListAsync();
		}
		public async Task<List<UserInfoDto>> GetByRoleAsync(RoleDto role)
		{
			return await _dbContext.Users
				.Where(u => u.Role == _mapper.Map<Role>(role))
				.Select(u => _mapper.Map<UserInfoDto>(u))
				.ToListAsync();
		}

		public async Task<UserInfoDto?> GetByIdAsync(int id)
		{
			return await _dbContext.Users
				.Where(u => u.Id == id)
				.Select(u => _mapper.Map<UserInfoDto>(u))
				.FirstOrDefaultAsync();
		}

		public async Task<List<CourseInfoDto>?> GetCoursesAsync(int id)
		{
			return await _dbContext.Users
				.Include(u => u.Courses)
				.ThenInclude(c => c.Instructor)
				.Where(u => u.Id == id)
				.SelectMany(u => u.Courses)
				.Select(c => _mapper.Map<CourseInfoDto>(c))
				.ToListAsync();
		}

		public async Task<UserInfoDto> AddAsync(UserRegistrationDto userRegistrationDto)
		{
			User user = _mapper.Map<User>(userRegistrationDto);
			_dbContext.Users.Add(user);
			await _dbContext.SaveChangesAsync();

			return _mapper.Map<UserInfoDto>(user);
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

		public async Task<bool> UpdateAsync(UserInfoDto userInfoDto)
		{
			int count = await _dbContext.Users
				.Where(user => user.Id == userInfoDto.Id)
				.ExecuteUpdateAsync(setters => setters
					.SetProperty(u => u.Role, _mapper.Map<Role>(userInfoDto.Role))
					.SetProperty(u => u.FirstName, userInfoDto.FirstName)
					.SetProperty(u => u.LastName, userInfoDto.LastName));
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

		Task<List<UserInfoDto>> GetByRoleAsync(RoleDto role);

		Task<UserInfoDto?> GetByIdAsync(int id);

		Task<List<CourseInfoDto>?> GetCoursesAsync(int id);

		Task<UserInfoDto> AddAsync(UserRegistrationDto userRegistrationDto);

		Task<bool> UpdatePasswordAsync(int id, string password);

		Task<bool> UpdateAsync(UserInfoDto userInfoDto);

		Task<bool> DeleteAsync(int id);
	}
}
