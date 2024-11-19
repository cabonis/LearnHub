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
		private readonly IAuthenticatedUserHelper _userHelper;

		[HttpGet("course/{courseId}")]
		[Authorize]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> GetByMyCourseIdAsync(int courseId)
		{
			string userName = _userHelper.GetUser(User);
			return Ok(await _moduleRepository.GetByMyCourseIdAsync(courseId, userName));
		}

		[HttpGet("admin/course/{courseId}")]
		[Authorize(AuthPolicies.InstructorPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> GetByCourseIdAsync(int courseId)
		{
			string? instructor = _userHelper.GetInstructor(User);
			return Ok(await _moduleRepository.GetByCourseIdAsync(courseId, instructor));
		}

		[HttpGet("admin/{id}")]
		[Authorize(AuthPolicies.InstructorPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> GetAsync(int id)
		{
			string? instructor = _userHelper.GetInstructor(User);
			ModuleInfoDto? moduleInfo = await _moduleRepository.GetAsync(id, instructor);

			if (moduleInfo != null)
			{
				return Ok(moduleInfo);
			}

			return NotFound();
		}

		[HttpPost("admin")]
		[Authorize(AuthPolicies.InstructorPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> AddAsync([FromBody] ModuleInfoDto moduleInfoDto)
		{
			string? instructor = _userHelper.GetInstructor(User);
			var moduleWithId = await _moduleRepository.AddAsync(moduleInfoDto, instructor);

			if (moduleWithId != null)
			{
				return Ok(moduleWithId);
			}

			return NotFound();
		}

		[HttpPut("admin")]
		[Authorize(AuthPolicies.InstructorPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> UpdateModule([FromBody] ModuleInfoDto moduleInfoDto)
		{
			string? instructor = _userHelper.GetInstructor(User);
			if (await _moduleRepository.UpdateAsync(moduleInfoDto, instructor))
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
			if (await _moduleRepository.DeleteAsync(id, instructor))
			{
				return Ok();
			}

			return NotFound();
		}

		public ModuleController(IModuleRepository moduleRepository, IAuthenticatedUserHelper userHelper)
		{
			_moduleRepository = moduleRepository;
			_userHelper = userHelper;
		}
	}
}