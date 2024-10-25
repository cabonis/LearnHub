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

		private async Task<Course?> FindCourse(int courseId)
		{
			return await _dbContext.Courses
				.Include(c => c.Announcements)
				.Where(c => c.Id == courseId)
				.FirstOrDefaultAsync();
		}

		public AnnouncementRepository(LearnDbContext dbContext, IMapper mapper)
		{
			_dbContext = dbContext;
			_mapper = mapper;
		}

		public async Task<AnnouncementDto?> AddAsync(int courseId, AnnouncementDto announcementDto)
		{
			Course? course = await FindCourse(courseId);

			if (course == null)
				return null;

			Announcement announcement = _mapper.Map<Announcement>(announcementDto);
			course.Announcements.Add(announcement);
			await _dbContext.SaveChangesAsync();
			return _mapper.Map<AnnouncementDto>(announcement);
		}

		public async Task<bool> DeleteAsync(int courseId, int announcementId)
		{
			Course? course = await FindCourse(courseId);

			if (course == null)
				return false;

			course.Announcements.RemoveAll(a => a.Id == announcementId);
			await _dbContext.SaveChangesAsync();
			return true;
		}
	}

	public interface IAnnouncementRepository
	{
		Task<AnnouncementDto?> AddAsync(int courseId, AnnouncementDto announcementDto);
		Task<bool> DeleteAsync(int courseId, int announcementId);
	}
}
