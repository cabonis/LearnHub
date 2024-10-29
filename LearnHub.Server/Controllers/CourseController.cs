﻿using LearnHub.Server.Dtos;
using LearnHub.Server.Repositories;
using Microsoft.AspNetCore.Mvc;


namespace LearnHub.Server.Controllers
{
	[ApiController]
	[Route("/api/course")]
	public class CourseController : ControllerBase
	{
		private readonly ICourseRepository _courseRepository;

		[HttpGet("")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> GetCourses()
		{
			return Ok(await _courseRepository.GetAllAsync());
		}

		[HttpGet("{id}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> GetCourse(int id)
		{
			var course = await _courseRepository.GetByIdAsync(id);

			if (course != null)
			{
				return Ok(course);
			}

			return NotFound();
		}

		[HttpPost("")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> AddCourse([FromBody] CourseInfoDto courseInfoDto)
		{
			return Ok(await _courseRepository.AddAsync(courseInfoDto));
		}

		[HttpPut("")]
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

		[HttpDelete("{id}")]
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

		public CourseController(ICourseRepository courseRepository)
		{
			_courseRepository = courseRepository;
		}
	}
}
