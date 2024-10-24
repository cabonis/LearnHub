using LearnHub.Data.Domain;

namespace LearnHub.Server.Dtos
{
	public record AnnouncementDto
	{
		public int Id { get; init; }
		public Priority Priority { get; init; }
		public DateTime DateTime { get; init; }
		public string Text { get; init; }
	}
}
