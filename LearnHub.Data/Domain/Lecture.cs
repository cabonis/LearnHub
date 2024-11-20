namespace LearnHub.Data.Domain
{
	public class Lecture
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public Module Module { get; set; }
		public int ModuleId { get; set; }
		public string VideoLink { get; set; }
	}
}
