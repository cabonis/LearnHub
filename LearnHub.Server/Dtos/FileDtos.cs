﻿namespace LearnHub.Server.Dtos
{
	public record FileDto
	{
		public int Id { get; init; }
		public string Title { get; init; }
		public string Description { get; init; }
	}
}