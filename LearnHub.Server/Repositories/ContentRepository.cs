﻿using AutoMapper;
using LearnHub.Data.Database;
using LearnHub.Data.Domain;
using LearnHub.Server.Dtos;
using LearnHub.Server.Helpers;

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

		public async Task<ContentInfoDto> AddAsync(ContentUplaodDto contentDto)
		{
			Content content = _mapper.Map<Content>(contentDto);

			using var transaction = _dbContext.Database.BeginTransaction();

			_dbContext.Content.Add(content);
			await _dbContext.SaveChangesAsync();

			await _contentHelper.StoreContentAsync(content.SystemFileName, contentDto.DataFile);

			transaction.Commit();
			return _mapper.Map<ContentInfoDto>(content);
		}

		public async Task<ContentDownloadDto?> GetAsync(int contentId)
		{
			Content? content = await _dbContext.Content.FindAsync(contentId);

			if (content == null)
			{
				return null;
			}

			Stream file = _contentHelper.GetContent(content.SystemFileName);
			return new ContentDownloadDto { FileName = content.OriginalFileName, File = file };
		}

		public async Task<bool> DeleteAsync(int contentId)
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
	}

	public interface IContentRepository
	{
		Task<ContentInfoDto> AddAsync(ContentUplaodDto contentDto);

		Task<ContentDownloadDto?> GetAsync(int contentId);

		Task<bool> DeleteAsync(int contentId);

	}
}
