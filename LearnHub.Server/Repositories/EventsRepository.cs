using AutoMapper;
using LearnHub.Data.Database;
using LearnHub.Server.Dtos;
using Microsoft.EntityFrameworkCore;

namespace LearnHub.Server.Repositories
{
	public class EventsRepository : IEventsRepository
	{
		private readonly LearnDbContext _dbContext;
		private readonly IMapper _mapper;

		public EventsRepository(LearnDbContext dbContext, IMapper mapper)
		{
			_dbContext = dbContext;
			_mapper = mapper;
		}

		public async Task<EventsDto> GetAllByUserAsync(string userName)
		{
			var courses = await _dbContext.Courses
				.Include(c => c.Modules)
				.Where(c => c.Users.Any(u => u.UserName == userName))
				.ToListAsync();

			EventsDto events = new EventsDto();

			foreach (var course in courses)
			{
				List<EventDto> courseEvents = new List<EventDto>();
				courseEvents.Add(new EventDto { Title = $"{course.Title} starts", Start = course.StartDate });
				courseEvents.Add(new EventDto { Title = $"{course.Title} ends", Start = course.EndDate });

				foreach (var module in course.Modules)
				{
					courseEvents.Add(new EventDto { Title = $"{module.Title} starts", Start = module.StartDate });
				}

				events.Add(course.Title, courseEvents);
			}

			return events;
		}
	}

	public interface IEventsRepository
	{
		Task<EventsDto> GetAllByUserAsync(string userName);
	}
}
