namespace LearnHub.Server.Dtos
{
	public class EventsDto : Dictionary<string, List<EventDto>> { }

	public record EventDto
	{
		public string Title { get; init; }
		public DateOnly Start { get; init; }
	}
}
