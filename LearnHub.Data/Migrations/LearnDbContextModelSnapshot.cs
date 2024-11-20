﻿// <auto-generated />
using System;
using LearnHub.Data.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace LearnHub.Data.Migrations
{
    [DbContext(typeof(LearnDbContext))]
    partial class LearnDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("CourseUser", b =>
                {
                    b.Property<int>("CoursesId")
                        .HasColumnType("int");

                    b.Property<int>("UsersId")
                        .HasColumnType("int");

                    b.HasKey("CoursesId", "UsersId");

                    b.HasIndex("UsersId");

                    b.ToTable("CourseUser");

                    b.HasData(
                        new
                        {
                            CoursesId = 1,
                            UsersId = 2
                        },
                        new
                        {
                            CoursesId = 2,
                            UsersId = 2
                        },
                        new
                        {
                            CoursesId = 3,
                            UsersId = 3
                        });
                });

            modelBuilder.Entity("LearnHub.Data.Domain.Announcement", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CourseId")
                        .HasColumnType("int");

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("Priority")
                        .HasColumnType("int");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CourseId");

                    b.ToTable("Announcements");
                });

            modelBuilder.Entity("LearnHub.Data.Domain.Content", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ModuleId")
                        .HasColumnType("int");

                    b.Property<string>("OriginalFileName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SystemFileName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ModuleId");

                    b.ToTable("Content");
                });

            modelBuilder.Entity("LearnHub.Data.Domain.Course", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateOnly>("EndDate")
                        .HasColumnType("date");

                    b.Property<int>("InstructorId")
                        .HasColumnType("int");

                    b.Property<DateOnly>("StartDate")
                        .HasColumnType("date");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("InstructorId");

                    b.ToTable("Courses");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "",
                            EndDate = new DateOnly(2024, 12, 31),
                            InstructorId = 1,
                            StartDate = new DateOnly(2024, 11, 1),
                            Title = "Physics 101"
                        },
                        new
                        {
                            Id = 2,
                            Description = "",
                            EndDate = new DateOnly(2024, 12, 31),
                            InstructorId = 1,
                            StartDate = new DateOnly(2024, 11, 1),
                            Title = "Math 101"
                        },
                        new
                        {
                            Id = 3,
                            Description = "",
                            EndDate = new DateOnly(2024, 12, 31),
                            InstructorId = 1,
                            StartDate = new DateOnly(2024, 11, 1),
                            Title = "English 101"
                        });
                });

            modelBuilder.Entity("LearnHub.Data.Domain.Lecture", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ModuleId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("VideoLink")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ModuleId");

                    b.ToTable("Lectures");
                });

            modelBuilder.Entity("LearnHub.Data.Domain.Module", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CourseId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateOnly>("StartDate")
                        .HasColumnType("date");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CourseId");

                    b.ToTable("Modules");
                });

            modelBuilder.Entity("LearnHub.Data.Domain.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserName")
                        .IsUnique();

                    b.ToTable("Users", t =>
                        {
                            t.HasCheckConstraint("CK_Users_PasswordHash", "[PasswordHash]<>N''");
                        });

                    b.HasData(
                        new
                        {
                            Id = 1,
                            FirstName = "LearnHub",
                            LastName = "Admin",
                            PasswordHash = "$2b$11$tqmJtna2R3Wr9dqe9.btr.R8Tz3XDam6Lxv3hoTyWCBYueY0tWx7e",
                            Role = 2,
                            UserName = "admin"
                        },
                        new
                        {
                            Id = 2,
                            FirstName = "Frank",
                            LastName = "Grass",
                            PasswordHash = "$2b$11$O1koiBK9QzggikA0OcgJ3eEsD90VMgByEZJ1mfp6mtv51BtrGK2/G",
                            Role = 0,
                            UserName = "user2"
                        },
                        new
                        {
                            Id = 3,
                            FirstName = "John",
                            LastName = "Mud",
                            PasswordHash = "$2b$11$OBdI.gJYHCSh3R/6MqKwsuHzvp28a8crwTGNSFvBqAGmnFff6htk.",
                            Role = 0,
                            UserName = "user3"
                        });
                });

            modelBuilder.Entity("CourseUser", b =>
                {
                    b.HasOne("LearnHub.Data.Domain.Course", null)
                        .WithMany()
                        .HasForeignKey("CoursesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LearnHub.Data.Domain.User", null)
                        .WithMany()
                        .HasForeignKey("UsersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("LearnHub.Data.Domain.Announcement", b =>
                {
                    b.HasOne("LearnHub.Data.Domain.Course", "Course")
                        .WithMany("Announcements")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Course");
                });

            modelBuilder.Entity("LearnHub.Data.Domain.Content", b =>
                {
                    b.HasOne("LearnHub.Data.Domain.Module", "Module")
                        .WithMany("Content")
                        .HasForeignKey("ModuleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Module");
                });

            modelBuilder.Entity("LearnHub.Data.Domain.Course", b =>
                {
                    b.HasOne("LearnHub.Data.Domain.User", "Instructor")
                        .WithOne()
                        .HasForeignKey("LearnHub.Data.Domain.Course", "InstructorId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Instructor");
                });

            modelBuilder.Entity("LearnHub.Data.Domain.Lecture", b =>
                {
                    b.HasOne("LearnHub.Data.Domain.Module", "Module")
                        .WithMany("Lectures")
                        .HasForeignKey("ModuleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Module");
                });

            modelBuilder.Entity("LearnHub.Data.Domain.Module", b =>
                {
                    b.HasOne("LearnHub.Data.Domain.Course", "Course")
                        .WithMany("Modules")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Course");
                });

            modelBuilder.Entity("LearnHub.Data.Domain.Course", b =>
                {
                    b.Navigation("Announcements");

                    b.Navigation("Modules");
                });

            modelBuilder.Entity("LearnHub.Data.Domain.Module", b =>
                {
                    b.Navigation("Content");

                    b.Navigation("Lectures");
                });
#pragma warning restore 612, 618
        }
    }
}
