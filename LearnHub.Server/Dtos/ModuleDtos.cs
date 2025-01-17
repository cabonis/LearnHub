﻿namespace LearnHub.Server.Dtos
{
	public record ModuleDetailDto : ModuleInfoDto
	{
		public List<ContentInfoDto> Content { get; init; }

		public List<LectureInfoDto> Lectures { get; init; }
	}

	public record ModuleInfoDto
	{
		public int Id { get; init; }
		public int CourseId { get; init; }
		public string Title { get; init; }
		public string Description { get; init; }
		public DateOnly StartDate { get; init; }
		public int ContentCount { get; init; }
		public int LecturesCount { get; init; }
	}
}
