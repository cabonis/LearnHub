namespace LearnHub.Data.Domain
{
	public class User
	{
		public int Id { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string UserName { get; set; }
		public string PasswordHash { get; set; }
		public Role Role { get; set; }
		public List<Course> Courses { get; set; }
	}

	public enum Role
	{
		Student = 0,
		Instructor = 1,
		Administrator = 2
	}
}
