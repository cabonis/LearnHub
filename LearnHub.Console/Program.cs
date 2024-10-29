using LearnHub.Data.Database;
using LearnHub.Data.Domain;
using Microsoft.EntityFrameworkCore;

Console.WriteLine("Hello World!");

LearnDbContext context = new LearnDbContext();

Course? course = await context.Courses.AsNoTracking()
				.Include(c => c.Modules)
				.Where(c => c.Id == 1)
				.FirstOrDefaultAsync();

//context.Update(course);

Module module = new Module
{
	Title = "Module1",
	Description = "Description 1"
};

course.Modules.Add(module);
context.SaveChanges();

Console.ReadLine();