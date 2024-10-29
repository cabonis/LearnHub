namespace LearnHub.Server.Dtos
{
	public record AnnouncementInfoDto
	{
		public int Id { get; init; }
		public int CourseId { get; init; }
		public PriorityDto Priority { get; init; }
		public string Text { get; init; }
	}

	public record AnnouncementDto : AnnouncementInfoDto
	{
		public DateTime DateTime { get; init; }
	}

	public enum PriorityDto
	{
		Low,
		High
	}
}
