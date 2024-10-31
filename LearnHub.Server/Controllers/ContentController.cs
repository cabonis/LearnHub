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

		[HttpPost]
		[Authorize(AuthPolicies.InstructorPolicy)]
		[RequestSizeLimit(10000000)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		public async Task<IActionResult> AddContent([FromForm] ContentUplaodDto contentDto)
		{
			if (contentDto.DataFile != null)
			{
				ContentInfoDto contentInfo = await _contentRepository.AddAsync(contentDto);
				return Ok(contentInfo);
			}

			return BadRequest();
		}

		[HttpGet("{id}")]
		[Authorize]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> GetContent(int id)
		{
			ContentDownloadDto? downloadDto = await _contentRepository.GetAsync(id);

			if (downloadDto != null)
			{
				return File(downloadDto.File, "APPLICATION/octet-stream", downloadDto.FileName);
			}

			return NotFound();
		}

		[HttpDelete("{id}")]
		[Authorize(AuthPolicies.InstructorPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> DeleteContent(int id)
		{
			if (await _contentRepository.DeleteAsync(id))
			{
				return Ok();
			}

			return NotFound();
		}

		public ContentController(IContentRepository contentRepository)
		{
			_contentRepository = contentRepository;
		}
	}
}
