﻿using LearnHub.Server.Dtos;
using LearnHub.Server.Helpers;
using LearnHub.Server.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace LearnHub.Server.Controllers
{
	[ApiController]
	[Route("/api/course")]
	public class CourseController : ControllerBase
	{
		private readonly ICourseRepository _courseRepository;
		private readonly IAuthenticatedUserHelper _userHelper;

		[HttpGet]
		[Authorize]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> GetMyCourses()
		{
			string userName = _userHelper.GetUser(User);
			return Ok(await _courseRepository.GetAllByUserAsync(userName));
		}

		[HttpGet("{id}")]
		[Authorize]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> GetMyCourseDetail(int id)
		{
			string userName = _userHelper.GetUser(User);
			var course = await _courseRepository.GetDetailByIdAndUserAsync(id, userName);

			if (course != null)
			{
				return Ok(course);
			}

			return NotFound();
		}

		[HttpGet("admin")]
		[Authorize(AuthPolicies.InstructorPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> GetAdminCoursesByRole()
		{
			string? instructor = _userHelper.GetInstructor(User);
			return Ok(await _courseRepository.GetAllAsync(instructor));
		}

		[HttpGet("admin/{id}")]
		[Authorize(AuthPolicies.InstructorPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> GetAdminCourseByRole(int id)
		{
			string? instructor = _userHelper.GetInstructor(User);
			var course = await _courseRepository.GetByIdAsync(id, instructor);

			if (course != null)
			{
				return Ok(course);
			}

			return NotFound();
		}


		[HttpPost("admin")]
		[Authorize(AuthPolicies.AdminPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> AddCourse([FromBody] CourseInfoDto courseInfoDto)
		{
			return Ok(await _courseRepository.AddAsync(courseInfoDto));
		}

		[HttpPut("admin")]
		[Authorize(AuthPolicies.AdminPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> UpdateCourse([FromBody] CourseInfoDto courseInfoDto)
		{
			if (await _courseRepository.UpdateAsync(courseInfoDto))
			{
				return Ok();
			}

			return NotFound();
		}

		[HttpDelete("admin/{id}")]
		[Authorize(AuthPolicies.AdminPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> DeleteCourse(int id)
		{
			if (await _courseRepository.DeleteAsync(id))
			{
				return Ok();
			}

			return NotFound();
		}

		public CourseController(ICourseRepository courseRepository, IAuthenticatedUserHelper userHelper)
		{
			_courseRepository = courseRepository;
			_userHelper = userHelper;
		}
	}
}
