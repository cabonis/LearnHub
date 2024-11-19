using AutoMapper;
using LearnHub.Data.Database;
using LearnHub.Data.Domain;
using LearnHub.Server.Dtos;
using LearnHub.Server.Helpers;
using Microsoft.EntityFrameworkCore;

namespace LearnHub.Server.Repositories
{
	public class ContentRepository : IContentRepository
	{
		private readonly LearnDbContext _dbContext;
		private readonly IMapper _mapper;
		private readonly IContentHelper _contentHelper;

		public ContentRepository(LearnDbContext dbContext, IMapper mapper, IContentHelper contentHelper)
		{
			_dbContext = dbContext;
			_mapper = mapper;
			_contentHelper = contentHelper;
		}

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

		private bool ValidateInstructorByContent(int contentId, string? instructor)
		{
			// Make sure the instructor is associated with the course they're modifying
			if (string.IsNullOrEmpty(instructor))
				return true;

			return _dbContext.Content
					.Where(c => c.Id == contentId && c.Module.Course.Instructor.UserName == instructor)
					.Any();
		}

		public async Task<ContentDownloadDto?> GetMyAsync(int contentId, string userName)
		{
			Content? content = await _dbContext.Content
				.Where(c => c.Id == contentId && c.Module.Course.Users.Any(u => u.UserName == userName))
				.FirstOrDefaultAsync();

			if (content == null)
			{
				return null;
			}

			Stream file = _contentHelper.GetContent(content.SystemFileName);
			return new ContentDownloadDto { FileName = content.OriginalFileName, File = file };
		}

		public async Task<List<ContentInfoDto>> GetByMyModuleAsync(int moduleId, string userName)
		{
			return await _dbContext.Content
				.Where(c => c.ModuleId == moduleId && c.Module.Course.Users.Any(u => u.UserName == userName))
				.Select(c => _mapper.Map<ContentInfoDto>(c))
				.ToListAsync();
		}

		public async Task<ContentDownloadDto?> GetAsync(int contentId, string? instructor)
		{
			if (ValidateInstructorByContent(contentId, instructor))
			{
				Content? content = await _dbContext.Content
				.Where(c => c.Id == contentId)
				.FirstOrDefaultAsync();

				if (content == null)
				{
					return null;
				}

				Stream file = _contentHelper.GetContent(content.SystemFileName);
				return new ContentDownloadDto { FileName = content.OriginalFileName, File = file };
			}

			return null;
		}

		public async Task<List<ContentInfoDto>> GetByModuleAsync(int moduleId, string? instructor)
		{
			if (ValidateInstructorByModule(moduleId, instructor))
			{
				return await _dbContext.Content
				.Where(c => c.ModuleId == moduleId)
				.Select(c => _mapper.Map<ContentInfoDto>(c))
				.ToListAsync();
			}

			return new List<ContentInfoDto>();
		}

		public async Task<ContentInfoDto?> AddAsync(ContentUplaodDto contentDto, string? instructor)
		{
			if (ValidateInstructorByModule(contentDto.ModuleId, instructor))
			{
				Content content = _mapper.Map<Content>(contentDto);

				using var transaction = _dbContext.Database.BeginTransaction();

				_dbContext.Content.Add(content);
				await _dbContext.SaveChangesAsync();

				await _contentHelper.StoreContentAsync(content.SystemFileName, contentDto.DataFile);

				transaction.Commit();
				return _mapper.Map<ContentInfoDto>(content);
			}

			return null;
		}

		public async Task<bool> UpdateAsync(ContentInfoBaseDto contentDto, string? instructor)
		{
			if (ValidateInstructorByModule(contentDto.ModuleId, instructor))
			{
				int count = await _dbContext.Content
				.Where(c => c.Id == contentDto.Id)
				.ExecuteUpdateAsync(setters => setters
					.SetProperty(c => c.Title, contentDto.Title));
				return count > 0;
			}

			return false;
		}

		public async Task<bool> DeleteAsync(int contentId, string? instructor)
		{
			if (ValidateInstructorByContent(contentId, instructor))
			{
				Content? content = await _dbContext.Content.FindAsync(contentId);

				if (content == null)
				{
					return false;
				}

				_dbContext.Content.Remove(content);
				await _dbContext.SaveChangesAsync();

				_contentHelper.RemoveContent(content.SystemFileName);
				return true;
			}

			return false;
		}
	}

	public interface IContentRepository
	{
		Task<ContentDownloadDto?> GetMyAsync(int contentId, string userName);

		Task<List<ContentInfoDto>> GetByMyModuleAsync(int moduleId, string user);

		Task<ContentDownloadDto?> GetAsync(int contentId, string? instructor);

		Task<List<ContentInfoDto>> GetByModuleAsync(int moduleId, string? instructor);

		Task<ContentInfoDto?> AddAsync(ContentUplaodDto contentDto, string? instructor);

		Task<bool> UpdateAsync(ContentInfoBaseDto contentInfoDto, string? instructor);

		Task<bool> DeleteAsync(int contentId, string? instructor);

	}
}
