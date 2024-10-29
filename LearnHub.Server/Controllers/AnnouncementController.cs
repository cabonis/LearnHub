using LearnHub.Server.Dtos;
using LearnHub.Server.Repositories;
using Microsoft.AspNetCore.Mvc;


namespace LearnHub.Server.Controllers
{
	[ApiController]
	[Route("/api/announcement")]
	public class AnnouncementController : ControllerBase
	{
		private readonly IAnnouncementRepository _announcementRepository;

		[HttpPost("")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> AddAsync([FromBody] AnnouncementInfoDto announcementInfoDto)
		{
			var announcementWithId = await _announcementRepository.AddAsync(announcementInfoDto);

			if (announcementWithId != null)
			{
				return Ok(announcementWithId);
			}

			return NotFound();
		}

		[HttpDelete("{id}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> DeleteAsync(int id)
		{
			if (await _announcementRepository.DeleteAsync(id))
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