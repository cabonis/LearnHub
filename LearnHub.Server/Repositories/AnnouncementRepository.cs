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

		private bool ValidateInstructor(int courseId, string? instructor)
		{
			// Make sure the instructor is associated with the course they're modifying
			if (!string.IsNullOrEmpty(instructor))
			{
				if (!_dbContext.Courses
					.Where(c => c.Instructor.UserName == instructor && c.Id == courseId)
					.Any())
				{
					return false;
				}
			}

			return true;
		}

		public AnnouncementRepository(LearnDbContext dbContext, IMapper mapper)
		{
			_dbContext = dbContext;
			_mapper = mapper;
		}

		public async Task<AnnouncementsDto> GetAllByUserAsync(string userName)
		{
			var courses = await _dbContext.Courses
				.Include(c => c.Announcements)
				.Where(c => c.Users.Any(u => u.UserName == userName))
				.ToListAsync();

			AnnouncementsDto announcements = new AnnouncementsDto();

			foreach (var course in courses)
			{
				if (course.Announcements.Any())
				{
					announcements.Add(course.Title, course.Announcements.Select(a => _mapper.Map<AnnouncementDto>(a)).ToList());
				}
			}

			return announcements;
		}


		public async Task<List<AnnouncementDto>> GetByCourseIdAndUserAsync(int courseId, string userName)
		{
			return await _dbContext.Announcements
				.Where(a => a.CourseId == courseId && a.Course.Users.Any(u => u.UserName == userName))
				.Select(a => _mapper.Map<AnnouncementDto>(a))
				.ToListAsync();
		}

		public async Task<List<AnnouncementDto>> GetByCourseIdAndInstructorAsync(int courseId, string? instructor)
		{
			return await _dbContext.Announcements
				.Where(a => a.CourseId == courseId && (string.IsNullOrEmpty(instructor) || a.Course.Instructor.UserName == instructor))
				.Select(a => _mapper.Map<AnnouncementDto>(a))
				.ToListAsync();
		}

		public async Task<AnnouncementDto?> AddAsync(AnnouncementInfoDto announcementInfoDto, string? instructor)
		{
			if (ValidateInstructor(announcementInfoDto.CourseId, instructor))
			{
				Announcement announcement = _mapper.Map<Announcement>(announcementInfoDto);
				_dbContext.Announcements.Add(announcement);
				await _dbContext.SaveChangesAsync();
				return _mapper.Map<AnnouncementDto>(announcement);
			}

			return null;
		}

		public async Task<bool> UpdateAsync(AnnouncementInfoDto announcementInfoDto, string? instructor)
		{
			if (ValidateInstructor(announcementInfoDto.CourseId, instructor))
			{
				int count = await _dbContext.Announcements
				.Where(a => a.Id == announcementInfoDto.Id)
				.ExecuteUpdateAsync(setters => setters
					.SetProperty(a => a.Text, announcementInfoDto.Text)
					.SetProperty(a => a.Priority, _mapper.Map<Priority>(announcementInfoDto.Priority)));
				return count > 0;
			}

			return false;
		}

		public async Task<bool> DeleteAsync(int announcementId, string? instructor)
		{
			int count = await _dbContext.Announcements
				.Where(a => a.Id == announcementId && (string.IsNullOrEmpty(instructor) || a.Course.Instructor.UserName == instructor))
				.ExecuteDeleteAsync();

			return count > 0;
		}
	}

	public interface IAnnouncementRepository
	{
		Task<AnnouncementsDto> GetAllByUserAsync(string userName);

		Task<List<AnnouncementDto>> GetByCourseIdAndUserAsync(int courseId, string userName);

		Task<List<AnnouncementDto>> GetByCourseIdAndInstructorAsync(int courseId, string? instructor);

		Task<bool> UpdateAsync(AnnouncementInfoDto announcementInfoDto, string? instructor);

		Task<AnnouncementDto?> AddAsync(AnnouncementInfoDto announcementInfoDto, string? instructor);

		Task<bool> DeleteAsync(int announcementId, string? instructor);
	}
}
