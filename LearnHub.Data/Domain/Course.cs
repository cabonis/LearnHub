namespace LearnHub.Data.Domain
{
	public class Course
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public int InstructorId { get; set; }
		public virtual User Instructor { get; set; }
		public List<CourseModule> Modules { get; set; }
		public List<User> Users { get; set; }
		public List<Announcement> Announcements { get; set; }
	}
}
