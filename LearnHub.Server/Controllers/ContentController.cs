using LearnHub.Server.Dtos;
using LearnHub.Server.Helpers;
using LearnHub.Server.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LearnHub.Server.Controllers
{
	[ApiController]
	[Route("/api/content")]
	public class ContentController : ControllerBase
	{
		private readonly IContentRepository _contentRepository;
		private readonly IAuthenticatedUserHelper _userHelper;

		[HttpGet("{id}")]
		[Authorize]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> GetMyContent(int id)
		{
			string userName = _userHelper.GetUser(User);
			ContentDownloadDto? downloadDto = await _contentRepository.GetMyAsync(id, userName);

			if (downloadDto != null)
			{
				return File(downloadDto.File, "APPLICATION/octet-stream", downloadDto.FileName);
			}

			return NotFound();
		}

		[HttpGet("module/{moduleId}")]
		[Authorize]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> GetByMyModuleId(int moduleId)
		{
			string userName = _userHelper.GetUser(User);
			return Ok(await _contentRepository.GetByMyModuleAsync(moduleId, userName));
		}

		[HttpGet("admin/{id}")]
		[Authorize(AuthPolicies.InstructorPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> GetContent(int id)
		{
			string? instructor = _userHelper.GetInstructor(User);
			ContentDownloadDto? downloadDto = await _contentRepository.GetAsync(id, instructor);

			if (downloadDto != null)
			{
				return File(downloadDto.File, "APPLICATION/octet-stream", downloadDto.FileName);
			}

			return NotFound();
		}

		[HttpGet("admin/module/{moduleId}")]
		[Authorize(AuthPolicies.InstructorPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> GetByModuleId(int moduleId)
		{
			string? instructor = _userHelper.GetInstructor(User);
			return Ok(await _contentRepository.GetByModuleAsync(moduleId, instructor));

		}

		[HttpPost("admin")]
		[Authorize(AuthPolicies.InstructorPolicy)]
		[RequestSizeLimit(10000000)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		public async Task<IActionResult> AddContent([FromForm] ContentUplaodDto contentDto)
		{
			if (contentDto.DataFile != null)
			{
				string? instructor = _userHelper.GetInstructor(User);
				ContentInfoDto contentInfo = await _contentRepository.AddAsync(contentDto, instructor);
				return Ok(contentInfo);
			}

			return BadRequest();
		}

		[HttpPut("admin")]
		[Authorize(AuthPolicies.InstructorPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> UpdateContent([FromBody] ContentInfoBaseDto contentInfoDto)
		{
			string? instructor = _userHelper.GetInstructor(User);
			if (await _contentRepository.UpdateAsync(contentInfoDto, instructor))
			{
				return Ok();
			}

			return NotFound();
		}

		[HttpDelete("admin/{id}")]
		[Authorize(AuthPolicies.InstructorPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> DeleteContent(int id)
		{
			string? instructor = _userHelper.GetInstructor(User);
			if (await _contentRepository.DeleteAsync(id, instructor))
			{
				return Ok();
			}

			return NotFound();
		}

		public ContentController(IContentRepository contentRepository, IAuthenticatedUserHelper userHelper)
		{
			_contentRepository = contentRepository;
			_userHelper = userHelper;
		}
	}
}
