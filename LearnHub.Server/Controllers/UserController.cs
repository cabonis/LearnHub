using System.Security.Claims;
using LearnHub.Server.Dtos;
using LearnHub.Server.Helpers;
using LearnHub.Server.Repositories;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LearnHub.Server.Controllers
{
	[ApiController]
	[Route("/api/user")]
	public class UserController : ControllerBase
	{
		private readonly IUserRepository _userRepository;

		[HttpPost("login")]
		public async Task<IActionResult> Login([FromBody] UserLoginDto userLogonDto)
		{
			UserInfoDto? user = await _userRepository.GetByUserLoginAsync(userLogonDto);

			if (user == null)
				return Unauthorized();

			var claims = new List<Claim>
			{
				new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
				new Claim(ClaimTypes.Name, user.UserName),
				new Claim(ClaimTypes.Role, user.Role.ToString())
			};

			var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
			var principal = new ClaimsPrincipal(identity);

			await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal,
				new AuthenticationProperties { IsPersistent = userLogonDto.IsPersistent });

			return Ok();
		}

		[HttpPost("logout")]
		[Authorize]
		public async Task<IActionResult> Logout()
		{
			await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
			return Ok();
		}

		[HttpPost("register")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		public async Task<IActionResult> RegisterUser([FromBody] UserRegistrationDto userDto)
		{
			await _userRepository.AddAsync(userDto);
			return Ok();
		}

		[HttpGet]
		[Authorize]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> GetMyUser()
		{
			string? userName = User.Identity?.Name;

			if (!string.IsNullOrEmpty(userName))
			{
				UserInfoDto? userInfoDto = await _userRepository.GetByUserNameAsync(userName);

				if (userInfoDto != null)
				{
					return Ok(userInfoDto);
				}
			}

			return NotFound();
		}

		[HttpGet("all")]
		[Authorize(AuthPolicies.AdminPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> GetUsers()
		{
			return Ok(await _userRepository.GetAllAsync());
		}


		//[HttpPut]
		//[ProducesResponseType(StatusCodes.Status200OK)]
		//[ProducesResponseType(StatusCodes.Status404NotFound)]
		//public async Task<IActionResult> UpdateUserPassword([FromBody] string password)
		//{

		//	if (await _userRepository.UpdatePasswordAsync(id, password))
		//	{
		//		return Ok();
		//	}

		//	return NotFound();
		//}

		[HttpPut()]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> UpdateUserRole([FromBody] UserInfoDto user)
		{
			if (await _userRepository.UpdateRoleAsync(user.Id, user.Role))
			{
				return Ok();
			}

			return NotFound();
		}

		[HttpDelete("{id}")]
		[Authorize(AuthPolicies.AdminPolicy)]
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
		[Authorize(AuthPolicies.AdminPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> GetUsersByRole(RoleDto role)
		{
			return Ok(await _userRepository.GetByRoleAsync(role));
		}


		public UserController(IUserRepository userRepository)
		{
			_userRepository = userRepository;
		}
	}
}
