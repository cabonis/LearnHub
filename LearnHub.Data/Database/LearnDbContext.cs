﻿using LearnHub.Data.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace LearnHub.Data.Database
{
	public class LearnDbContext : DbContext
	{
		public DbSet<Course> Courses { get; set; }
		public DbSet<Module> Modules { get; set; }
		public DbSet<Content> Content { get; set; }
		public DbSet<Announcement> Announcements { get; set; }
		public DbSet<User> Users { get; set; }

		public LearnDbContext() : base() { }

		public LearnDbContext(DbContextOptions<LearnDbContext> options) : base(options)
		{
		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			if (!optionsBuilder.IsConfigured)
			{
				optionsBuilder.UseSqlServer("Data Source = (localdb)\\MSSQLLocalDB; Initial Catalog = LearnHubDb")
					.LogTo(Console.WriteLine, new[] { DbLoggerCategory.Database.Command.Name }, LogLevel.Information)
					.EnableSensitiveDataLogging();
			}
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<User>()
				.ToTable(t => t.HasCheckConstraint("CK_Users_PasswordHash", "[PasswordHash]<>N''"))
				.HasIndex(u => u.UserName)
				.IsUnique();

			modelBuilder.Entity<User>().HasData(
				[
					new User{ Id = 1, UserName = "user1", FirstName = "Joe", LastName = "Dirt", PasswordHash = "$2b$11$cmttKuuLuaJhPucqV4VZouXJsa4DqNSWnJMXBwp.6rQ1laUbGnoNS" },
					new User{ Id = 2, UserName = "user2", FirstName = "Frank", LastName = "Grass", PasswordHash = "$2b$11$O1koiBK9QzggikA0OcgJ3eEsD90VMgByEZJ1mfp6mtv51BtrGK2/G" },
					new User{ Id = 3, UserName = "user3", FirstName = "John", LastName = "Mud", PasswordHash = "$2b$11$OBdI.gJYHCSh3R/6MqKwsuHzvp28a8crwTGNSFvBqAGmnFff6htk." },
				]);

			modelBuilder.Entity<Course>()
				.HasOne(c => c.Instructor)
				.WithOne()
				.HasForeignKey<Course>(c => c.InstructorId)
				.OnDelete(DeleteBehavior.Restrict);

			modelBuilder.Entity<Course>()
				.HasIndex(c => c.InstructorId)
				.IsUnique(false);

			modelBuilder.Entity<Course>().HasData(
				[
					new Course{ Id = 1, Title = "Physics 101", Description = "", InstructorId = 1 },
					new Course{ Id = 2, Title = "Math 101", Description = "", InstructorId = 1 },
					new Course{ Id = 3, Title = "English 101", Description = "", InstructorId = 1 }
				]);

			modelBuilder.Entity<Course>()
				.HasMany(c => c.Users)
				.WithMany(u => u.Courses)
				.UsingEntity(cu => cu.HasData(
					new { CoursesId = 1, UsersId = 2 },
					new { CoursesId = 2, UsersId = 2 },
					new { CoursesId = 3, UsersId = 3 }));


		}
	}
}
