namespace LearnHub.Data.Domain
{
	public class CourseFile
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public int ModuleId { get; set; }
		public string FileLocation { get; set; }
	}
}
