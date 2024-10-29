namespace LearnHub.Server.Dtos
{
	public record ContentInfoDto
	{
		public int Id { get; init; }
		public string Title { get; init; }
		public string Description { get; init; }
		public int ModuleId { get; init; }
	}

	public record ContentUplaodDto : ContentInfoDto
	{
		public IFormFile DataFile { get; init; }
	}

	public record ContentDownloadDto
	{
		public string FileName { get; init; }
		public Stream File { get; init; }
	}
}
