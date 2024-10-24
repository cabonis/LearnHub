﻿// <auto-generated />
using System;
using LearnHub.Data.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace LearnHub.Data.Migrations
{
    [DbContext(typeof(LearnDbContext))]
    [Migration("20241023225857_initial")]
    partial class initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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

                    b.Property<int?>("CourseId")
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

                    b.ToTable("Announcement");
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

                    b.Property<int>("InstructorId")
                        .HasColumnType("int");

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
                            InstructorId = 1,
                            Title = "Physics 101"
                        },
                        new
                        {
                            Id = 2,
                            Description = "",
                            InstructorId = 1,
                            Title = "Math 101"
                        },
                        new
                        {
                            Id = 3,
                            Description = "",
                            InstructorId = 1,
                            Title = "English 101"
                        });
                });

            modelBuilder.Entity("LearnHub.Data.Domain.CourseFile", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("CourseModuleId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FileLocation")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ModuleId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CourseModuleId");

                    b.ToTable("CourseFile");
                });

            modelBuilder.Entity("LearnHub.Data.Domain.CourseModule", b =>
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

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CourseId");

                    b.ToTable("CourseModule");
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
                            FirstName = "Joe",
                            LastName = "Dirt",
                            PasswordHash = "$2b$11$cmttKuuLuaJhPucqV4VZouXJsa4DqNSWnJMXBwp.6rQ1laUbGnoNS",
                            Role = 0,
                            UserName = "user1"
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
                    b.HasOne("LearnHub.Data.Domain.Course", null)
                        .WithMany("Announcements")
                        .HasForeignKey("CourseId");
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

            modelBuilder.Entity("LearnHub.Data.Domain.CourseFile", b =>
                {
                    b.HasOne("LearnHub.Data.Domain.CourseModule", null)
                        .WithMany("Content")
                        .HasForeignKey("CourseModuleId");
                });

            modelBuilder.Entity("LearnHub.Data.Domain.CourseModule", b =>
                {
                    b.HasOne("LearnHub.Data.Domain.Course", null)
                        .WithMany("Modules")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("LearnHub.Data.Domain.Course", b =>
                {
                    b.Navigation("Announcements");

                    b.Navigation("Modules");
                });

            modelBuilder.Entity("LearnHub.Data.Domain.CourseModule", b =>
                {
                    b.Navigation("Content");
                });
#pragma warning restore 612, 618
        }
    }
}
