using AutoMapper;
using LearnHub.Data.Domain;
using LearnHub.Server.Dtos;

namespace LearnHub.Server.Helpers
{
	public class DtoMapperProfile : Profile
	{
		public DtoMapperProfile() { }

		public DtoMapperProfile(IPasswordHasher hasher)
		{
			CreateMap<User, UserInfoDto>().ReverseMap();
			CreateMap<UserRegistrationDto, User>()
				.ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src => hasher.Hash(src.Password)));

			CreateMap<CourseFile, FileDto>();
			CreateMap<CourseModule, ModuleDto>();
			CreateMap<Announcement, AnnouncementDto>();
			CreateMap<Course, CourseDetailDto>();
			CreateMap<Course, CourseInfoDto>();

			CreateMap<AnnouncementDto, Announcement>()
				.ForMember(dest => dest.Id, opt => opt.Ignore())
				.ForMember(dest => dest.DateTime, opt => opt.MapFrom(src => DateTime.Now));
			CreateMap<CourseInfoDto, Course>()
				.ForMember(dest => dest.Id, opt => opt.Ignore());
		}
	}
}
