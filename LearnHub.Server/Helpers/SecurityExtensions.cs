using System.Security.Claims;
using LearnHub.Server.Dtos;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace LearnHub.Server.Helpers
{
	public static class AuthPolicies
	{
		public const string AdminPolicy = "Admin";
		public const string InstructorPolicy = "Instructor";
	}

	public static class AuthenticationExtensions
	{
		public static void AddCustomAuthentication(this IServiceCollection services)
		{
			services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
				.AddCookie(opts =>
				{
					opts.Cookie.Name = "__Host-spa";
					opts.Cookie.SameSite = SameSiteMode.Strict;
					opts.Events.OnRedirectToLogin = (context) =>
					{
						context.Response.StatusCode = StatusCodes.Status401Unauthorized;
						return Task.CompletedTask;
					};
				});

			services.AddAntiforgery(o =>
			{
				o.Cookie.Name = "X-CSRF-TOKEN";
			});
		}
	}

	public static class AuthorizationExtensions
	{
		public static void AddCustomAuthorization(this IServiceCollection services)
		{

			services.AddAuthorizationBuilder()
				.AddPolicy(AuthPolicies.AdminPolicy, p => p.RequireClaim(ClaimTypes.Role, RoleDto.Admin.ToString()))
				.AddPolicy(AuthPolicies.InstructorPolicy, p => p.RequireClaim(ClaimTypes.Role, RoleDto.Instructor.ToString(), RoleDto.Admin.ToString()));
		}
	}
}
