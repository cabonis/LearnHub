using AutoMapper;
using LearnHub.Data.Database;
using LearnHub.Data.Domain;
using LearnHub.Server.Dtos;
using Microsoft.EntityFrameworkCore;

namespace LearnHub.Server.Repositories
{
	public class LectureRepository : ILectureRepository
	{
		private readonly LearnDbContext _dbContext;
		private readonly IMapper _mapper;

		private bool ValidateInstructor(int moduleId, string? instructor)
		{
			// Make sure the instructor is associated with the course they're modifying
			if (string.IsNullOrEmpty(instructor))
				return true;

			return _dbContext.Modules
					.Where(m => m.Id == moduleId && m.Course.Instructor.UserName == instructor)
					.Any();
		}

		public async Task<List<LectureInfoDto>> GetByModuleIdAndInstructorAsync(int moduleId, string? instructor)
		{
			return await _dbContext.Lectures
				.Where(l => l.ModuleId == moduleId && (string.IsNullOrEmpty(instructor) || l.Module.Course.Instructor.UserName == instructor))
				.Select(l => _mapper.Map<LectureInfoDto>(l))
				.ToListAsync();
		}


		public async Task<LectureInfoDto?> AddAsync(LectureInfoDto lectureInfoDto, string? instructor)
		{
			if (ValidateInstructor(lectureInfoDto.ModuleId, instructor))
			{
				Lecture lecture = _mapper.Map<Lecture>(lectureInfoDto);
				_dbContext.Lectures.Add(lecture);
				await _dbContext.SaveChangesAsync();
				return _mapper.Map<LectureInfoDto>(lecture);
			}

			return null;
		}

		public async Task<bool> UpdateAsync(LectureInfoDto lectureInfoDto, string? instructor)
		{
			if (ValidateInstructor(lectureInfoDto.ModuleId, instructor))
			{
				int count = await _dbContext.Lectures
					.Where(l => l.Id == lectureInfoDto.Id)
					.ExecuteUpdateAsync(setters => setters
						.SetProperty(l => l.Title, lectureInfoDto.Title)
						.SetProperty(l => l.VideoLink, lectureInfoDto.VideoLink));
				return count > 0;
			}

			return false;
		}

		public async Task<bool> DeleteAsync(int lectureId, string? instructor)
		{
			int count = await _dbContext.Lectures
				.Where(l => l.Id == lectureId && (string.IsNullOrEmpty(instructor) || l.Module.Course.Instructor.UserName == instructor))
				.ExecuteDeleteAsync();

			return count > 0;
		}


		public LectureRepository(LearnDbContext dbContext, IMapper mapper)
		{
			_dbContext = dbContext;
			_mapper = mapper;
		}
	}

	public interface ILectureRepository
	{
		Task<List<LectureInfoDto>> GetByModuleIdAndInstructorAsync(int moduleId, string? instructor);
		Task<LectureInfoDto?> AddAsync(LectureInfoDto lectureInfoDto, string? instructor);
		Task<bool> UpdateAsync(LectureInfoDto lectureInfoDto, string? instructor);
		Task<bool> DeleteAsync(int lectureId, string? instructor);
	}
}
