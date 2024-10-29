using LearnHub.Data.Domain;

namespace LearnHub.Server.Dtos
{
	public record AnnouncementInfoDto
	{
		public int Id { get; init; }
		public int CourseId { get; init; }
		public Priority Priority { get; init; }
		public string Text { get; init; }
	}

	public record AnnouncementDto : AnnouncementInfoDto
	{
		public DateTime DateTime { get; init; }
	}
}
