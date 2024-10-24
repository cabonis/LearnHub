using LearnHub.Data.Database;
using LearnHub.Data.Domain;
using LearnHub.Server.Dtos;
using Microsoft.EntityFrameworkCore;

namespace LearnHub.Server.Repositories
{
	public class CourseRepository : ICourseRepository
	{
		private readonly LearnDbContext _dbContext;

		private CourseDto ToCourseDto(Course course) => new()
		{
			Id = course.Id,
			Title = course.Title,
			Description = course.Description,
		};

		public CourseRepository(LearnDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task<List<Course>> GetAllAsync()
		{
			return await _dbContext.Courses
				.Include(c => c.Modules)
				.ThenInclude(m => m.Content)
				.Include(c => c.Announcements)
				.ToListAsync();
		}

		public async Task<Course?> GetByIdAsync(int id)
		{
			return await _dbContext.Courses.FirstOrDefaultAsync(x => x.Id == id);
		}
	}

	public interface ICourseRepository
	{
		Task<List<Course>> GetAllAsync();

		Task<Course?> GetByIdAsync(int id);
	}
}
