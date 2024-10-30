namespace LearnHub.Server.Dtos
{
	public record UserLoginDto
	{
		public required string UserName { get; init; }
		public required string Password { get; init; }
		public required bool IsPersistent { get; init; }
	}

	public abstract record UserDtoBase
	{
		public required string FirstName { get; init; }
		public required string LastName { get; init; }
		public required string UserName { get; init; }
	}

	public record UserInfoDto : UserDtoBase
	{
		public required int Id { get; init; }
		public required RoleDto Role { get; init; }
	}

	public record UserRegistrationDto : UserDtoBase
	{
		public required string Password { get; init; }
	}

	public enum RoleDto
	{
		User,
		Instructor,
		Administrator
	}
}
