namespace LearnHub.Data.Domain
{
	public class Module
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public DateOnly StartDate { get; set; }
		public int CourseId { get; set; }
		public virtual Course Course { get; set; }
		public List<Content> Content { get; set; }
	}
}
