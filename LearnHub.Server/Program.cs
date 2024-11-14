using System.Text.Json.Serialization;
using LearnHub.Data.Database;
using LearnHub.Server.Helpers;
using LearnHub.Server.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers()
	.AddJsonOptions(opts => opts.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

builder.Services.AddCustomAuthentication();
builder.Services.AddCustomAuthorization();

builder.Services.AddDbContext<LearnDbContext>(
	opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("LearnDbConnection"))
	.EnableSensitiveDataLogging()
	.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking));

builder.Services.ConfigureHttpJsonOptions(
	opt => opt.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddAutoMapper((s, m) =>
		m.AddProfile(new DtoMapperProfile(s.GetService<IPasswordHasher>())), typeof(DtoMapperProfile));

builder.Services.AddSingleton<IPasswordHasher, BcryptPasswordHasher>();
builder.Services.AddSingleton<IContentHelper, ContentStorageHelper>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ICourseRepository, CourseRepository>();
builder.Services.AddScoped<IAnnouncementRepository, AnnouncementRepository>();
builder.Services.AddScoped<IModuleRepository, ModuleRepository>();
builder.Services.AddScoped<IContentRepository, ContentRepository>();
builder.Services.AddScoped<IEnrollmentRepository, EnrollmentRepository>();
builder.Services.AddScoped<IEventsRepository, EventsRepository>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI(options =>
	{
		options.DefaultModelsExpandDepth(-1);
		options.EnableTryItOutByDefault();
	});
}

app.UseAuthentication();
app.UseAuthorization();
app.UseHttpsRedirection();
app.MapControllers();
app.MapControllers().AllowAnonymous();
app.MapFallbackToFile("/index.html");

app.Run();
