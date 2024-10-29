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

		public async Task<ModuleDetailDto?> GetAsync(int moduleId)
		{
			return await _dbContext.Modules
				.Include(m => m.Content)
				.Where(m => m.Id == moduleId)
				.Select(m => _mapper.Map<ModuleDetailDto>(m))
				.FirstOrDefaultAsync();
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

		Task<ModuleDetailDto?> GetAsync(int moduleId);

		Task<bool> DeleteAsync(int moduleId);
	}
}
