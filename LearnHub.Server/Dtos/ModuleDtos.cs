namespace LearnHub.Server.Dtos
{
	public record ModuleDto
	{
		public int Id { get; init; }
		public string Title { get; init; }
		public string Description { get; init; }
		public List<FileDto> Content { get; init; }
	}
}
