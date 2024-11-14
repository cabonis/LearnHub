namespace LearnHub.Data.Domain
{
	public class Content
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public Module Module { get; set; }
		public int ModuleId { get; set; }
		public string OriginalFileName { get; set; }
		public string SystemFileName { get; set; }
	}
}
