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

		public async Task<UserInfoDto?> GetByUserLoginAsync(UserLoginDto userLogonDto)
		{
			User? user = await _dbContext.Users
				.Where(u => u.UserName == userLogonDto.UserName)
				.FirstOrDefaultAsync();

			if (user != null && _passwordHasher.Verify(userLogonDto.Password, user.PasswordHash))
			{
				return _mapper.Map<UserInfoDto>(user);
			}

			return null;
		}

		public async Task AddAsync(UserRegistrationDto userRegistrationDto)
		{
			User user = _mapper.Map<User>(userRegistrationDto);
			_dbContext.Users.Add(user);
			await _dbContext.SaveChangesAsync();
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
				.Where(u => u.Role >= _mapper.Map<Role>(role))
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

		public async Task<UserInfoDto?> GetByUserNameAsync(string userName)
		{
			return await _dbContext.Users
				.Where(u => u.UserName == userName)
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

		public async Task<bool> UpdatePasswordAsync(string userName, ChangePasswordDto changePassword)
		{
			User? user = await _dbContext.Users
				.Where(u => u.UserName == userName)
				.FirstOrDefaultAsync();

			if (user != null && _passwordHasher.Verify(changePassword.CurrentPassword, user.PasswordHash))
			{
				user.PasswordHash = _passwordHasher.Hash(changePassword.NewPassword);
				_dbContext.Update(user);
				_dbContext.SaveChanges();
				return true;
			}

			return false;
		}

		public async Task<bool> UpdateRoleAsync(int id, RoleDto userRole)
		{
			int count = await _dbContext.Users
				.Where(user => user.Id == id)
				.ExecuteUpdateAsync(setters => setters
					.SetProperty(u => u.Role, _mapper.Map<Role>(userRole)));
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
		Task<UserInfoDto?> GetByUserLoginAsync(UserLoginDto userLogonDto);

		Task<List<UserInfoDto>> GetAllAsync();

		Task<List<UserInfoDto>> GetByRoleAsync(RoleDto role);

		Task<UserInfoDto?> GetByIdAsync(int id);

		Task<UserInfoDto?> GetByUserNameAsync(string userName);

		Task<List<CourseInfoDto>?> GetCoursesAsync(int id);

		Task AddAsync(UserRegistrationDto userRegistrationDto);

		Task<bool> UpdatePasswordAsync(string userName, ChangePasswordDto changePassword);

		Task<bool> UpdateRoleAsync(int id, RoleDto userRole);

		Task<bool> DeleteAsync(int id);
	}
}
