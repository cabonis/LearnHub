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
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> GetAsync()
		{
			var moduleWithId = await _eventsRepository.GetAllAsync();

			if (moduleWithId != null)
			{
				return Ok(moduleWithId);
			}

			return NotFound();
		}

		public EventsController(IEventsRepository eventsRepository)
		{
			_eventsRepository = eventsRepository;
		}
	}
}