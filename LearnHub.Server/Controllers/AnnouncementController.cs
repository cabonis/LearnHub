using LearnHub.Server.Dtos;
using LearnHub.Server.Helpers;
using LearnHub.Server.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace LearnHub.Server.Controllers
{
	[ApiController]
	[Route("/api/announcement")]
	public class AnnouncementController : ControllerBase
	{
		private readonly IAnnouncementRepository _announcementRepository;
		private readonly IAuthenticatedUserHelper _userHelper;

		[HttpGet]
		[Authorize]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> GetMyAsync()
		{
			string userName = _userHelper.GetUser(User);
			return Ok(await _announcementRepository.GetAllByUserAsync(userName));
		}

		[HttpGet("course/{courseId}")]
		[Authorize]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> GetByCourseAsync(int courseId)
		{
			string userName = _userHelper.GetUser(User);
			var announcementWithId = await _announcementRepository.GetByCourseIdAndUserAsync(courseId, userName);

			if (announcementWithId != null)
			{
				return Ok(announcementWithId);
			}

			return NotFound();
		}

		[HttpGet("admin/{id}")]
		[Authorize(AuthPolicies.InstructorPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> GetByIdAsync(int id)
		{
			string? instructor = _userHelper.GetInstructor(User);
			return Ok(await _announcementRepository.GetByCourseIdAndInstructorAsync(id, instructor));

		}

		[HttpPost("admin")]
		[Authorize(AuthPolicies.InstructorPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> AddAsync([FromBody] AnnouncementInfoDto announcementInfoDto)
		{
			string? instructor = _userHelper.GetInstructor(User);
			var announcementWithId = await _announcementRepository.AddAsync(announcementInfoDto, instructor);

			if (announcementWithId != null)
			{
				return Ok(announcementWithId);
			}

			return NotFound();
		}

		[HttpPut("admin")]
		[Authorize(AuthPolicies.InstructorPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> UpdateAsync([FromBody] AnnouncementInfoDto announcementInfoDto)
		{
			string? instructor = _userHelper.GetInstructor(User);
			if (await _announcementRepository.UpdateAsync(announcementInfoDto, instructor))
			{
				return Ok();
			}

			return NotFound();
		}

		[HttpDelete("admin/{id}")]
		[Authorize(AuthPolicies.InstructorPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> DeleteAsync(int id)
		{
			string? instructor = _userHelper.GetInstructor(User);
			if (await _announcementRepository.DeleteAsync(id, instructor))
			{
				return Ok();
			}

			return NotFound();
		}

		public AnnouncementController(IAnnouncementRepository announcementRepository, IAuthenticatedUserHelper userHelper)
		{
			_announcementRepository = announcementRepository;
			_userHelper = userHelper;
		}
	}
}