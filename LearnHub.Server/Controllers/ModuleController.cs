using LearnHub.Server.Dtos;
using LearnHub.Server.Helpers;
using LearnHub.Server.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace LearnHub.Server.Controllers
{
	[ApiController]
	[Route("/api/module")]
	public class ModuleController : ControllerBase
	{
		private readonly IModuleRepository _moduleRepository;

		[HttpPost]
		[Authorize(AuthPolicies.InstructorPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> AddAsync([FromBody] ModuleInfoDto moduleInfoDto)
		{
			var moduleWithId = await _moduleRepository.AddAsync(moduleInfoDto);

			if (moduleWithId != null)
			{
				return Ok(moduleWithId);
			}

			return NotFound();
		}

		[HttpGet("course/{courseId}")]
		[Authorize]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> GetByCourseIdAsync(int courseId)
		{
			List<ModuleInfoDto> modules = await _moduleRepository.GetByCourseIdAsync(courseId);

			if (modules != null)
			{
				return Ok(modules);
			}

			return NotFound();
		}

		[HttpGet("{id}")]
		[Authorize]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> GetAsync(int id)
		{
			ModuleDetailDto? moduleDetails = await _moduleRepository.GetAsync(id);

			if (moduleDetails != null)
			{
				return Ok(moduleDetails);
			}

			return NotFound();
		}

		[HttpPut]
		[Authorize(AuthPolicies.InstructorPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> UpdateModule([FromBody] ModuleInfoDto moduleInfoDto)
		{
			if (await _moduleRepository.UpdateAsync(moduleInfoDto))
			{
				return Ok();
			}

			return NotFound();
		}

		[HttpDelete("{id}")]
		[Authorize(AuthPolicies.InstructorPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> DeleteAsync(int id)
		{
			if (await _moduleRepository.DeleteAsync(id))
			{
				return Ok();
			}

			return NotFound();
		}

		public ModuleController(IModuleRepository moduleRepository)
		{
			_moduleRepository = moduleRepository;
		}
	}
}