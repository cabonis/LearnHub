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

		public async Task<List<CoruseInstructorInfo>> GetAllAsync()
		{
			return await _dbContext.Courses
				.Include(c => c.Instructor)
				.Select(c => _mapper.Map<CoruseInstructorInfo>(c))
				.ToListAsync();
		}

		public async Task<CourseInfoDto?> GetByIdAsync(int id)
		{
			return await _dbContext.Courses
				.Include(c => c.Instructor)
				.Where(c => c.Id == id)
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
					.SetProperty(c => c.InstructorId, courseInfoDto.InstructorId));
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
		Task<List<CoruseInstructorInfo>> GetAllAsync();

		Task<CourseInfoDto?> GetByIdAsync(int id);

		Task<CourseInfoDto> AddAsync(CourseInfoDto courseInfoDto);

		Task<bool> UpdateAsync(CourseInfoDto courseInfoDto);

		Task<bool> DeleteAsync(int id);
	}
}
