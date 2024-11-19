using LearnHub.Server.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace LearnHub.Server.Controllers
{
	[ApiController]
	[Route("/api/events")]
	public class EventsController : ControllerBase
	{
		private readonly IEventsRepository _eventsRepository;

		[HttpGet]
		[Authorize]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> GetAsync()
		{
			string userName = User.Identity?.Name ?? string.Empty;
			var events = await _eventsRepository.GetAllByUserAsync(userName);

			return Ok(events);
		}

		public EventsController(IEventsRepository eventsRepository)
		{
			_eventsRepository = eventsRepository;
		}
	}
}