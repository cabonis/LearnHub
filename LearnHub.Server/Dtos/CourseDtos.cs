namespace LearnHub.Server.Dtos
{

	public record CourseInfoDto
	{
		public int Id { get; init; }
		public string Title { get; init; }
		public string Description { get; init; }
		public DateOnly StartDate { get; init; }
		public DateOnly EndDate { get; init; }
		public int InstructorId { get; init; }
		public int UserCount { get; init; }
		public int ModuleCount { get; init; }
		public int AnnouncementCount { get; init; }
	}

	public record CoruseModuleInfo : CourseInfoDto
	{
		public UserInfoDto Instructor { get; init; }

		public List<ModuleInfoDto> Modules { get; init; }
	}

	public record CourseDetailDto : CoruseModuleInfo
	{
		public List<UserInfoDto> Users { get; init; }

		public List<AnnouncementDto> Announcements { get; init; }
	}
}
