using LearnHub.Data.Domain;
using LearnHub.Server.Repositories;
using Microsoft.AspNetCore.Mvc;


namespace LearnHub.Server.Controllers
{
	[ApiController]
	[Route("/api/course")]
	public class CourseController : ControllerBase
	{
		private readonly ICourseRepository _courseRepository;

		[HttpGet("all")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<List<Course>> GetCourses()
		{
			return await _courseRepository.GetAllAsync();
		}

		[HttpGet("{id}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> GetCourse(int id)
		{
			var course = await _courseRepository.GetByIdAsync(id);

			if (course == null)
			{
				return NotFound();
			}

			return Ok(course);
		}

		public CourseController(ICourseRepository courseRepository)
		{
			_courseRepository = courseRepository;
		}
	}
}
