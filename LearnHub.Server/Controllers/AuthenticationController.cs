using System.Security.Claims;
using LearnHub.Server.Dtos;
using LearnHub.Server.Repositories;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LearnHub.Server.Controllers
{
	[ApiController]
	[Route("/api/auth")]
	public class AuthnticationController : ControllerBase
	{
		private readonly IUserRepository _userRepository;

		[HttpGet]
		[Authorize]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
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

			return Unauthorized();
		}

		[HttpPost]
		[Authorize]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		public async Task<IActionResult> ChangeMyPassword([FromBody] ChangePasswordDto changePassword)
		{
			string? userName = User.Identity?.Name;

			if (!string.IsNullOrEmpty(userName))
			{
				if (await _userRepository.UpdatePasswordAsync(userName, changePassword))
				{
					return Ok();
				}
			}

			return Unauthorized();
		}

		[HttpPost("login")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
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


		public AuthnticationController(IUserRepository userRepository)
		{
			_userRepository = userRepository;
		}
	}
}
