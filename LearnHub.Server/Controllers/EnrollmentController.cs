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
		private readonly IAuthenticatedUserHelper _userHelper;

		[HttpGet("{courseId}")]
		[Authorize(AuthPolicies.InstructorPolicy)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> GetEnrollment(int courseId)
		{
			string? instructor = _userHelper.GetInstructor(User);
			var users = await _enrollmentRepository.GetByCourseIdAsync(courseId, instructor);

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


		public EnrollmentController(IEnrollmentRepository enrollmentRepository, IAuthenticatedUserHelper userHelper)
		{
			_enrollmentRepository = enrollmentRepository;
			_userHelper = userHelper;
		}
	}
}
