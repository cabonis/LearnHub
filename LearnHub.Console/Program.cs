using LearnHub.Data.Database;

Console.WriteLine("Hello World!");

LearnDbContext context = new LearnDbContext();
int usersCount = context.Users.Count();

Console.ReadLine();