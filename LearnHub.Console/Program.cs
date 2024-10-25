using LearnHub.Data.Database;
using LearnHub.Data.Domain;

Console.WriteLine("Hello World!");

LearnDbContext context = new LearnDbContext();

Course course = new()
{
	//Id = 10,
	Title = "CIS 602",
	Description = "Advanced AI",
	InstructorId = 1
};

context.Courses.Add(course);
context.SaveChanges();

Console.ReadLine();