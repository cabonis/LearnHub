﻿namespace LearnHub.Server.Dtos
{
	public record ChangePasswordDto
	{
		public string CurrentPassword { get; init; }
		public string NewPassword { get; init; }
	}
}
