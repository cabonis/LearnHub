namespace LearnHub.Server.Dtos
{
	public abstract record ContentInfoBaseDto
	{
		public int Id { get; init; }
		public string Title { get; init; }
		public int ModuleId { get; init; }
	}

	public record ContentInfoDto : ContentInfoBaseDto
	{
		public string OriginalFileName { get; init; }
	}

	public record ContentUplaodDto : ContentInfoBaseDto
	{
		public IFormFile DataFile { get; init; }
	}

	public record ContentDownloadDto
	{
		public string FileName { get; init; }
		public Stream File { get; init; }
	}
}
