using AutoMapper;
using LearnHub.Data.Database;
using LearnHub.Data.Domain;
using LearnHub.Server.Dtos;
using Microsoft.EntityFrameworkCore;

namespace LearnHub.Server.Repositories
{
	public class EnrollmentRepository : IEnrollmentRepository
	{
		private readonly LearnDbContext _dbContext;
		private readonly IMapper _mapper;

		public EnrollmentRepository(LearnDbContext dbContext, IMapper mapper)
		{
			_dbContext = dbContext;
			_mapper = mapper;
		}

		public async Task<List<UserInfoDto>> GetByCourseIdAsync(int courseId, string? instructor)
		{
			return await _dbContext.Courses
				.Include(c => c.Users)
				.Where(c => c.Id == courseId && (string.IsNullOrEmpty(instructor) || c.Instructor.UserName == instructor))
				.SelectMany(c => c.Users)
				.Select(u => _mapper.Map<UserInfoDto>(u))
				.ToListAsync();
		}

		public async Task<bool> UpdateAsync(int courseId, List<UserInfoDto> userInfoDtos)
		{
			Course? course = await _dbContext.Courses
				.Include(c => c.Users)
				.Where(c => c.Id == courseId)
				.FirstOrDefaultAsync();

			if (course == null)
				return false;

			_dbContext.Attach(course);

			var existingEnrollment = course.Users.Select(u => u.Id);
			var targetEnrollment = userInfoDtos.Select(u => u.Id);

			var usersToAdd = targetEnrollment.Except(existingEnrollment);
			var usersToRemove = existingEnrollment.Except(targetEnrollment);

			course.Users.RemoveAll(u => usersToRemove.Contains(u.Id));

			if (usersToAdd.Any())
			{
				var users = await _dbContext.Users
					.Where(u => usersToAdd.Contains(u.Id))
					.ToListAsync();

				course.Users.AddRange(users);
			}

			_dbContext.SaveChanges();
			return true;
		}
	}

	public interface IEnrollmentRepository
	{
		Task<List<UserInfoDto>> GetByCourseIdAsync(int courseId, string? instructor);

		Task<bool> UpdateAsync(int courseId, List<UserInfoDto> userInfoDtos);
	}
}
