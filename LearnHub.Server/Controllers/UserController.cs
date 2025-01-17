﻿using LearnHub.Server.Dtos;
using LearnHub.Server.Helpers;
using LearnHub.Server.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LearnHub.Server.Controllers
{
	[ApiController]
	[Route("/api/user")]
	public class UserController : ControllerBase
	{
		private readonly IUserRepository _userRepository;
		private readonly IAuthenticatedUserHelper _userHelper;


		[HttpGet("all")]
		[Authorize(AuthPolicies.InstructorPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> GetUsers()
		{
			return Ok(await _userRepository.GetAllAsync());
		}

		[HttpPut()]
		[Authorize(AuthPolicies.AdminPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> UpdateUserRole([FromBody] UserInfoDto user)
		{
			int userId = _userHelper.GetUserId(User);

			// User may not modify themselves
			if (userId == user.Id)
				return BadRequest();

			// Do not allow downgrade to user if they are currently a course instructor
			if (user.Role == RoleDto.User && await _userRepository.IsCourseInstructorAsync(user.Id))
			{
				return BadRequest();
			}

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
			int userId = _userHelper.GetUserId(User);

			// User may not delete themselves
			if (userId == id)
				return BadRequest();

			if (await _userRepository.DeleteAsync(id))
			{
				return Ok();
			}

			return NotFound();
		}

		[HttpGet("role/{role}")]
		[Authorize(AuthPolicies.InstructorPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> GetUsersByRole(RoleDto role)
		{
			return Ok(await _userRepository.GetByRoleAsync(role));
		}


		public UserController(IUserRepository userRepository, IAuthenticatedUserHelper userHelper)
		{
			_userRepository = userRepository;
			_userHelper = userHelper;
		}
	}
}
