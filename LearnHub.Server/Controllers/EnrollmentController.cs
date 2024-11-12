using LearnHub.Server.Dtos;
using LearnHub.Server.Helpers;
using LearnHub.Server.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace LearnHub.Server.Controllers
{
	[ApiController]
	[Route("/api/enrollment")]
	public class EnrollmentController : ControllerBase
	{
		private readonly IEnrollmentRepository _enrollmentRepository;

		[HttpGet("{courseId}")]
		[Authorize(AuthPolicies.AdminPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> GetEnrollment(int courseId)
		{
			var users = await _enrollmentRepository.GetByCourseIdAsync(courseId);

			if (users != null)
			{
				return Ok(users);
			}

			return NotFound();
		}

		[HttpPut()]
		[Authorize(AuthPolicies.AdminPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> UpdateEnrollment([FromBody] EnrollmentDto enrollmentDto)
		{
			if (await _enrollmentRepository.UpdateAsync(enrollmentDto.CourseId, enrollmentDto.Users))
			{
				return Ok();
			}

			return NotFound();
		}


		public EnrollmentController(IEnrollmentRepository enrollmentRepository)
		{
			_enrollmentRepository = enrollmentRepository;
		}
	}
}
