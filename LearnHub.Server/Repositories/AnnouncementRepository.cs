using AutoMapper;
using LearnHub.Data.Database;
using LearnHub.Data.Domain;
using LearnHub.Server.Dtos;
using Microsoft.EntityFrameworkCore;

namespace LearnHub.Server.Repositories
{
	public class AnnouncementRepository : IAnnouncementRepository
	{
		private readonly LearnDbContext _dbContext;
		private readonly IMapper _mapper;

		public AnnouncementRepository(LearnDbContext dbContext, IMapper mapper)
		{
			_dbContext = dbContext;
			_mapper = mapper;
		}

		public async Task<AnnouncementsDto> GetAllAsync()
		{
			var courses = await _dbContext.Courses
				.Include(c => c.Announcements)
				.ToListAsync();

			AnnouncementsDto announcements = new AnnouncementsDto();

			foreach (var course in courses)
			{
				announcements.Add(course.Title, course.Announcements.Select(a => _mapper.Map<AnnouncementDto>(a)).ToList());
			}

			return announcements;
		}


		public async Task<List<AnnouncementDto>> GetByCourseIdAsync(int courseId)
		{
			return await _dbContext.Announcements
				.Where(a => a.CourseId == courseId)
				.Select(a => _mapper.Map<AnnouncementDto>(a))
				.ToListAsync();
		}

		public async Task<AnnouncementDto> AddAsync(AnnouncementInfoDto announcementInfoDto)
		{
			Announcement announcement = _mapper.Map<Announcement>(announcementInfoDto);
			_dbContext.Announcements.Add(announcement);
			await _dbContext.SaveChangesAsync();
			return _mapper.Map<AnnouncementDto>(announcement);
		}

		public async Task<bool> UpdateAsync(AnnouncementInfoDto announcementInfoDto)
		{
			int count = await _dbContext.Announcements
				.Where(a => a.Id == announcementInfoDto.Id)
				.ExecuteUpdateAsync(setters => setters
					.SetProperty(a => a.Text, announcementInfoDto.Text)
					.SetProperty(a => a.Priority, _mapper.Map<Priority>(announcementInfoDto.Priority)));
			return count > 0;
		}

		public async Task<bool> DeleteAsync(int announcementId)
		{
			int count = await _dbContext.Announcements
				.Where(a => a.Id == announcementId)
				.ExecuteDeleteAsync();

			return count > 0;
		}
	}

	public interface IAnnouncementRepository
	{
		Task<AnnouncementsDto> GetAllAsync();

		Task<List<AnnouncementDto>> GetByCourseIdAsync(int courseId);

		Task<bool> UpdateAsync(AnnouncementInfoDto announcementInfoDto);

		Task<AnnouncementDto> AddAsync(AnnouncementInfoDto announcementInfoDto);

		Task<bool> DeleteAsync(int announcementId);
	}
}
