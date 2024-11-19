using AutoMapper;
using LearnHub.Data.Database;
using LearnHub.Data.Domain;
using LearnHub.Server.Dtos;
using Microsoft.EntityFrameworkCore;

namespace LearnHub.Server.Repositories
{
	public class ModuleRepository : IModuleRepository
	{
		private readonly LearnDbContext _dbContext;
		private readonly IMapper _mapper;

		private bool ValidateInstructorByModule(int moduleId, string? instructor)
		{
			// Make sure the instructor is associated with the course they're modifying
			if (string.IsNullOrEmpty(instructor))
				return true;

			return _dbContext.Courses
					.Where(c => c.Instructor.UserName == instructor
						&& c.Modules.Any(m => m.Id == moduleId))
					.Any();
		}

		private bool ValidateInstructorByCourse(int courseId, string? instructor)
		{
			// Make sure the instructor is associated with the course they're modifying
			if (string.IsNullOrEmpty(instructor))
				return true;

			return _dbContext.Courses
					.Where(c => c.Instructor.UserName == instructor
						&& c.Id == courseId)
					.Any();
		}

		public ModuleRepository(LearnDbContext dbContext, IMapper mapper)
		{
			_dbContext = dbContext;
			_mapper = mapper;
		}

		public async Task<List<ModuleInfoDto>> GetByMyCourseIdAsync(int courseId, string userName)
		{
			DateOnly now = DateOnly.FromDateTime(DateTime.Now);

			return await _dbContext.Courses
				.Include(c => c.Modules)
				.Where(c => c.Id == courseId
					&& c.Users.Any(u => u.UserName == userName)
					&& c.StartDate <= now)
				.SelectMany(c => c.Modules)
				.Select(m => _mapper.Map<ModuleInfoDto>(m))
				.ToListAsync();
		}

		public async Task<List<ModuleInfoDto>> GetByCourseIdAsync(int courseId, string? instructor)
		{
			return await _dbContext.Courses
				.Include(c => c.Modules)
				.Where(c => c.Id == courseId && (string.IsNullOrEmpty(instructor) || c.Instructor.UserName == instructor))
				.SelectMany(c => c.Modules)
				.Select(m => _mapper.Map<ModuleInfoDto>(m))
				.ToListAsync();
		}

		public async Task<ModuleInfoDto?> GetAsync(int moduleId, string? instructor)
		{
			if (ValidateInstructorByModule(moduleId, instructor))
			{
				return await _dbContext.Modules
				.Include(m => m.Content)
				.Where(m => m.Id == moduleId)
				.Select(m => _mapper.Map<ModuleInfoDto>(m))
				.FirstOrDefaultAsync();
			}

			return null;
		}

		public async Task<ModuleInfoDto?> AddAsync(ModuleInfoDto moduleDto, string? instructor)
		{
			if (ValidateInstructorByCourse(moduleDto.CourseId, instructor))
			{
				Module module = _mapper.Map<Module>(moduleDto);
				_dbContext.Modules.Add(module);
				await _dbContext.SaveChangesAsync();
				return _mapper.Map<ModuleInfoDto>(module);
			}

			return null;
		}

		public async Task<bool> UpdateAsync(ModuleInfoDto moduleDto, string? instructor)
		{
			if (ValidateInstructorByModule(moduleDto.Id, instructor))
			{
				int count = await _dbContext.Modules
				.Where(m => m.Id == moduleDto.Id)
				.ExecuteUpdateAsync(setters => setters
					.SetProperty(m => m.Title, moduleDto.Title)
					.SetProperty(m => m.Description, moduleDto.Description)
					.SetProperty(m => m.StartDate, moduleDto.StartDate));
				return count > 0;
			}

			return false;
		}

		public async Task<bool> DeleteAsync(int moduleId, string? instructor)
		{
			if (ValidateInstructorByModule(moduleId, instructor))
			{
				int count = await _dbContext.Modules
				.Where(m => m.Id == moduleId)
				.ExecuteDeleteAsync();

				return count > 0;
			}

			return false;
		}
	}

	public interface IModuleRepository
	{
		Task<List<ModuleInfoDto>> GetByMyCourseIdAsync(int courseId, string userName);

		Task<List<ModuleInfoDto>> GetByCourseIdAsync(int courseId, string? instructor);

		Task<ModuleInfoDto?> GetAsync(int moduleId, string? instructor);

		Task<ModuleInfoDto?> AddAsync(ModuleInfoDto moduleDto, string? instructor);

		Task<bool> UpdateAsync(ModuleInfoDto moduleDto, string? instructor);

		Task<bool> DeleteAsync(int moduleId, string? instructor);
	}
}
