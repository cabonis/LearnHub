using LearnHub.Data.Domain;
using LearnHub.Server.Dtos;
using LearnHub.Server.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace LearnHub.Server.Controllers
{
	[ApiController]
	[Route("/api/user")]
	public class UserController : ControllerBase
	{
		private readonly IUserRepository _userRepository;

		[HttpGet("")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> GetUsers()
		{
			return Ok(await _userRepository.GetAllAsync());
		}

		[HttpPost("")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		public async Task<IActionResult> AddUser([FromBody] UserRegistrationDto userDto)
		{
			return Ok(await _userRepository.AddAsync(userDto));
		}

		[HttpGet("{id}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> GetUser(int id)
		{
			UserInfoDto? userInfoDto = await _userRepository.GetByIdAsync(id);

			if (userInfoDto != null)
			{
				return Ok(userInfoDto);
			}

			return NotFound();
		}

		[HttpGet("{id}/courses")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> GetCourses(int id)
		{
			List<CourseInfoDto>? courses = await _userRepository.GetCoursesAsync(id);

			if (courses != null)
			{
				return Ok(courses);
			}

			return NotFound();
		}

		[HttpPut("{id}/pw")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> UpdateUserPassword(int id, [FromBody] string password)
		{
			if (await _userRepository.UpdatePasswordAsync(id, password))
			{
				return Ok();
			}

			return NotFound();
		}

		[HttpPut("")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> UpdateUser([FromBody] UserInfoDto userInfoDto)
		{
			if (await _userRepository.UpdateAsync(userInfoDto))
			{
				return Ok();
			}

			return NotFound();
		}

		[HttpDelete("{id}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> DeleteUser(int id)
		{
			if (await _userRepository.DeleteAsync(id))
			{
				return Ok();
			}

			return NotFound();
		}

		[HttpGet("role/{role}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> GetUsersByRole(Role role)
		{
			return Ok(await _userRepository.GetByRoleAsync(role));
		}

		public UserController(IUserRepository userRepository)
		{
			_userRepository = userRepository;
		}
	}
}
