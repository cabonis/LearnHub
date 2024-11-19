using System.Security.Claims;
using LearnHub.Server.Dtos;

namespace LearnHub.Server.Helpers
{
	public class AuthenticatedUserHelper : IAuthenticatedUserHelper
	{
		public string GetUser(ClaimsPrincipal principal)
		{
			return principal.Identity?.Name ?? string.Empty;
		}

		public string? GetInstructor(ClaimsPrincipal principal)
		{
			string role = principal?.Claims.Where(c => c.Type == ClaimTypes.Role).First().Value ?? string.Empty;
			string userName = principal?.Identity?.Name ?? string.Empty;
			return role == RoleDto.Instructor.ToString() ? userName : null;
		}
	}

	public interface IAuthenticatedUserHelper
	{
		string GetUser(ClaimsPrincipal principal);
		string? GetInstructor(ClaimsPrincipal principal);
	}
}
