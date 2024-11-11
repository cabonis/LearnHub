namespace LearnHub.Server.Dtos
{
	public record EnrollmentDto
	{
		public int CourseId { get; init; }

		public List<UserInfoDto> Users { get; init; }
	}
}
