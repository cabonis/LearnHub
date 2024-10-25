using LearnHub.Server.Dtos;
using LearnHub.Server.Repositories;
using Microsoft.AspNetCore.Mvc;


namespace LearnHub.Server.Controllers
{
	[ApiController]
	[Route("/api/course/{courseId}/announcement")]
	public class AnnouncementController : ControllerBase
	{
		private readonly IAnnouncementRepository _announcementRepository;

		[HttpPost("")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> AddAsync([FromRoute] int courseId, [FromBody] AnnouncementDto announcementDto)
		{
			var announcementWithId = await _announcementRepository.AddAsync(courseId, announcementDto);

			if (announcementWithId != null)
			{
				return Ok(announcementWithId);
			}

			return NotFound();
		}

		[HttpDelete("{id}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> DeleteAnnouncement([FromRoute] int courseId, int id)
		{
			if (await _announcementRepository.DeleteAsync(courseId, id))
			{
				return Ok();
			}

			return NotFound();
		}

		public AnnouncementController(IAnnouncementRepository announcementRepository)
		{
			_announcementRepository = announcementRepository;
		}
	}
}