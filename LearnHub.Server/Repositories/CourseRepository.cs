using AutoMapper;
using LearnHub.Data.Database;
using LearnHub.Data.Domain;
using LearnHub.Server.Dtos;
using Microsoft.EntityFrameworkCore;

namespace LearnHub.Server.Repositories
{
	public class CourseRepository : ICourseRepository
	{
		private readonly LearnDbContext _dbContext;
		private readonly IMapper _mapper;

		public CourseRepository(LearnDbContext dbContext, IMapper mapper)
		{
			_dbContext = dbContext;
			_mapper = mapper;
		}

		public async Task<List<CoruseInstructorInfo>> GetAllByUserAsync(string userName)
		{
			return await _dbContext.Courses
				.Include(c => c.Instructor)
				.Include(c => c.Modules)
				.Include(c => c.Announcements)
				.Include(c => c.Users)
				.Where(c => c.Users.Any(u => u.UserName == userName))
				.Select(c => _mapper.Map<CoruseInstructorInfo>(c))
				.ToListAsync();
		}

		public async Task<CourseDetailDto?> GetDetailByIdAndUserAsync(int id, string userName)
		{
			var details = await _dbContext.Courses
				.Include(c => c.Instructor)
				.Include(c => c.Modules)
					.ThenInclude(m => m.Content)
				.Include(c => c.Announcements)
				.Include(c => c.Users)
				.Where(c => c.Id == id && c.Users.Any(u => u.UserName == userName))
				.Select(c => _mapper.Map<CourseDetailDto>(c))
				.FirstOrDefaultAsync();

			details?.Announcements.Sort((x, y) => y.DateTime.CompareTo(x.DateTime));
			details?.Modules.Sort((x, y) => y.StartDate.CompareTo(x.StartDate));
			return details;
		}

		public async Task<List<CoruseInstructorInfo>> GetAllAsync(string? instructor)
		{
			return await _dbContext.Courses
				.Include(c => c.Instructor)
				.Include(c => c.Modules)
				.Include(c => c.Announcements)
				.Include(c => c.Users)
				.Where(c => (string.IsNullOrEmpty(instructor) || c.Instructor.UserName == instructor))
				.Select(c => _mapper.Map<CoruseInstructorInfo>(c))
				.ToListAsync();
		}


		public async Task<CourseInfoDto?> GetByIdAsync(int id, string? instructor)
		{
			return await _dbContext.Courses
				.Include(c => c.Instructor)
				.Include(c => c.Modules)
				.Include(c => c.Announcements)
				.Include(c => c.Users)
				.Where(c => c.Id == id && (string.IsNullOrEmpty(instructor) || c.Instructor.UserName == instructor))
				.Select(c => _mapper.Map<CourseInfoDto>(c))
				.FirstOrDefaultAsync();
		}

		public async Task<CourseInfoDto> AddAsync(CourseInfoDto courseInfoDto)
		{
			Course course = _mapper.Map<Course>(courseInfoDto);
			_dbContext.Courses.Add(course);
			await _dbContext.SaveChangesAsync();
			return _mapper.Map<CourseInfoDto>(course);
		}

		public async Task<bool> UpdateAsync(CourseInfoDto courseInfoDto)
		{
			int count = await _dbContext.Courses
				.Where(c => c.Id == courseInfoDto.Id)
				.ExecuteUpdateAsync(setters => setters
					.SetProperty(c => c.Title, courseInfoDto.Title)
					.SetProperty(c => c.Description, courseInfoDto.Description)
					.SetProperty(c => c.InstructorId, courseInfoDto.InstructorId)
					.SetProperty(c => c.StartDate, courseInfoDto.StartDate)
					.SetProperty(c => c.EndDate, courseInfoDto.EndDate));
			return count > 0;
		}

		public async Task<bool> DeleteAsync(int id)
		{
			int count = await _dbContext.Courses
				.Where(c => c.Id == id)
				.ExecuteDeleteAsync();

			return count > 0;
		}
	}

	public interface ICourseRepository
	{
		Task<List<CoruseInstructorInfo>> GetAllAsync(string? instructor);

		Task<CourseInfoDto?> GetByIdAsync(int id, string? instructor);

		Task<List<CoruseInstructorInfo>> GetAllByUserAsync(string userName);

		Task<CourseDetailDto?> GetDetailByIdAndUserAsync(int id, string userName);

		Task<CourseInfoDto> AddAsync(CourseInfoDto courseInfoDto);

		Task<bool> UpdateAsync(CourseInfoDto courseInfoDto);

		Task<bool> DeleteAsync(int id);
	}
}
