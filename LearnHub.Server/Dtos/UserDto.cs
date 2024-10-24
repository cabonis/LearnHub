using LearnHub.Data.Domain;

namespace LearnHub.Server.Dtos
{
	public abstract record UserDtoBase
	{
		public required string FirstName { get; init; }
		public required string LastName { get; init; }
	}

	public record UserInfoDto : UserDtoBase
	{
		public required int Id { get; init; }
		public required Role Role { get; init; }
	}

	public record UserRegistrationDto : UserDtoBase
	{
		public required string UserName { get; init; }
		public required string Password { get; init; }
	}
}
