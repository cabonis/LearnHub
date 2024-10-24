namespace LearnHub.Data.Domain
{
	public class Announcement
	{
		public int Id { get; set; }
		public Priority Priority { get; set; }
		public DateTime DateTime { get; set; }
		public string Text { get; set; }
	}

	public enum Priority
	{
		Low = 0,
		High = 1
	}
}
