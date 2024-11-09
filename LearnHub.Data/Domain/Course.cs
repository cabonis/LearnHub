namespace LearnHub.Data.Domain
{
	public class Course
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public DateOnly StartDate { get; set; }
		public DateOnly EndDate { get; set; }
		public int InstructorId { get; set; }
		public virtual User Instructor { get; set; }
		public List<Module> Modules { get; set; } = new();
		public List<User> Users { get; set; } = new();
		public List<Announcement> Announcements { get; set; } = new();
	}
}
