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