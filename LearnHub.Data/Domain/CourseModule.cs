namespace LearnHub.Data.Domain
{
	public class CourseModule
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public int CourseId { get; set; }
		public List<CourseFile> Content { get; set; }
	}
}
