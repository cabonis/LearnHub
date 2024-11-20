using LearnHub.Server.Dtos;
using LearnHub.Server.Helpers;
using LearnHub.Server.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace LearnHub.Server.Controllers
{
	[ApiController]
	[Route("/api/lectures")]
	public class LectureController : ControllerBase
	{
		private readonly ILectureRepository _lectureRepository;
		private readonly IAuthenticatedUserHelper _userHelper;


		[HttpGet("admin/module/{moduleId}")]
		[Authorize(AuthPolicies.InstructorPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> GetByModuleId(int moduleId)
		{
			string? instructor = _userHelper.GetInstructor(User);
			return Ok(await _lectureRepository.GetByModuleIdAndInstructorAsync(moduleId, instructor));
		}

		[HttpPost("admin")]
		[Authorize(AuthPolicies.InstructorPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> AddAsync([FromBody] LectureInfoDto lectureInfoDto)
		{
			string? instructor = _userHelper.GetInstructor(User);
			var announcementWithId = await _lectureRepository.AddAsync(lectureInfoDto, instructor);

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
		public async Task<IActionResult> UpdateAsync([FromBody] LectureInfoDto lectureInfoDto)
		{
			string? instructor = _userHelper.GetInstructor(User);
			if (await _lectureRepository.UpdateAsync(lectureInfoDto, instructor))
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
			if (await _lectureRepository.DeleteAsync(id, instructor))
			{
				return Ok();
			}

			return NotFound();
		}

		public LectureController(ILectureRepository lectureRepository, IAuthenticatedUserHelper userHelper)
		{
			_lectureRepository = lectureRepository;
			_userHelper = userHelper;
		}
	}
}