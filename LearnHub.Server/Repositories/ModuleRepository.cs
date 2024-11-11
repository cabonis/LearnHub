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

		public ModuleRepository(LearnDbContext dbContext, IMapper mapper)
		{
			_dbContext = dbContext;
			_mapper = mapper;
		}

		public async Task<ModuleInfoDto> AddAsync(ModuleInfoDto moduleDto)
		{
			Module module = _mapper.Map<Module>(moduleDto);
			_dbContext.Modules.Add(module);
			await _dbContext.SaveChangesAsync();
			return _mapper.Map<ModuleInfoDto>(module);
		}

		public async Task<List<ModuleInfoDto>> GetByCourseIdAsync(int courseId)
		{
			return await _dbContext.Courses
				.Include(c => c.Modules)
				.Where(c => c.Id == courseId)
				.SelectMany(c => c.Modules)
				.Select(m => _mapper.Map<ModuleInfoDto>(m))
				.ToListAsync();
		}

		public async Task<ModuleDetailDto?> GetAsync(int moduleId)
		{
			return await _dbContext.Modules
				.Include(m => m.Content)
				.Where(m => m.Id == moduleId)
				.Select(m => _mapper.Map<ModuleDetailDto>(m))
				.FirstOrDefaultAsync();
		}

		public async Task<bool> UpdateAsync(ModuleInfoDto moduleDto)
		{
			int count = await _dbContext.Modules
				.Where(m => m.Id == moduleDto.Id)
				.ExecuteUpdateAsync(setters => setters
					.SetProperty(m => m.Title, moduleDto.Title)
					.SetProperty(m => m.Description, moduleDto.Description)
					.SetProperty(m => m.StartDate, moduleDto.StartDate));
			return count > 0;
		}

		public async Task<bool> DeleteAsync(int moduleId)
		{
			int count = await _dbContext.Modules
				.Where(m => m.Id == moduleId)
				.ExecuteDeleteAsync();

			return count > 0;
		}
	}

	public interface IModuleRepository
	{
		Task<ModuleInfoDto> AddAsync(ModuleInfoDto moduleDto);

		Task<List<ModuleInfoDto>> GetByCourseIdAsync(int courseId);

		Task<ModuleDetailDto?> GetAsync(int moduleId);

		Task<bool> UpdateAsync(ModuleInfoDto moduleDto);

		Task<bool> DeleteAsync(int moduleId);
	}
}
