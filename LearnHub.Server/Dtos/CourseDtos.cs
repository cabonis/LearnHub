namespace LearnHub.Server.Dtos
{

	public record CourseInfoDto
	{
		public int Id { get; init; }
		public string Title { get; init; }
		public string Description { get; init; }
		public int InstructorId { get; init; }
	}

	public record CourseDetailDto : CourseInfoDto
	{
		public UserInfoDto Instructor { get; init; }

		public List<ModuleDto> Modules { get; init; }

		public List<AnnouncementDto> Announcements { get; init; }
	}
}
