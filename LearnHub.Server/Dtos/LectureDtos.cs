namespace LearnHub.Server.Dtos
{
	public record LectureInfoDto
	{
		public int Id { get; init; }
		public int ModuleId { get; init; }
		public string Title { get; init; }
		public string VideoLink { get; init; }
	}
}
