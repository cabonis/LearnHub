using LearnHub.Data.Domain;
using LearnHub.Server.Dtos;

namespace LearnHub.Server.Helpers
{
	public class DtoConversionHelper
	{
		private readonly IPasswordHasher _passwordHasher;

		public UserInfoDto ToUserInfoDto(User user) => new()
		{
			Id = user.Id,
			FirstName = user.FirstName,
			LastName = user.LastName,
			Role = user.Role,
		};

		public CourseInfoDto ToCourseInfoDto(Course course) => new()
		{
			Id = course.Id,
			Title = course.Title,
			Description = course.Description,
			Instructor = ToUserInfoDto(course.Instructor),
		};

		public CourseDto ToCourse(Course course) => new()
		{
			Id = course.Id,
			Title = course.Title,
			Description = course.Description,
			Instructor = ToUserInfoDto(course.Instructor),
			Modules = course?.Modules?.Select(ToModuleDto).ToList()
		};

		public ModuleDto ToModuleDto(CourseModule module) => new()
		{
			Id = module.Id,
			Title = module.Title,
			Description = module.Description,
			Content =
		};

		public User ToUser(UserRegistrationDto userRegistrationDto) => new()
		{
			FirstName = userRegistrationDto.FirstName,
			LastName = userRegistrationDto.LastName,
			UserName = userRegistrationDto.UserName,
			PasswordHash = _passwordHasher.Hash(userRegistrationDto.Password)
		};

		public DtoConversionHelper(IPasswordHasher passwordHasher)
		{
			_passwordHasher = passwordHasher;
		}

	}
}
