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
			CreateMap<Role, RoleDto>().ReverseMap();

			CreateMap<Content, ContentInfoDto>();
			CreateMap<Lecture, LectureInfoDto>();
			CreateMap<Announcement, AnnouncementDto>();

			CreateMap<Module, ModuleDetailDto>();
			CreateMap<Module, ModuleInfoDto>()
				.ForMember(mi => mi.LecturesCount, opt => opt.MapFrom(m => m.Lectures.Count()))
				.ForMember(mi => mi.ContentCount, opt => opt.MapFrom(m => m.Content.Count()))
				.Include<Module, ModuleDetailDto>();

			CreateMap<Course, CourseDetailDto>();
			CreateMap<Course, CoruseModuleInfo>();
			CreateMap<Course, CourseInfoDto>()
				.ForMember(ci => ci.AnnouncementCount, opt => opt.MapFrom(c => c.Announcements.Count()))
				.ForMember(ci => ci.ModuleCount, opt => opt.MapFrom(c => c.Modules.Count()))
				.ForMember(ci => ci.UserCount, opt => opt.MapFrom(c => c.Users.Count()))
				.Include<Course, CoruseModuleInfo>()
				.Include<Course, CourseDetailDto>();

			CreateMap<UserRegistrationDto, User>()
				.ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src => hasher.Hash(src.Password)));

			CreateMap<AnnouncementInfoDto, Announcement>()
				.ForMember(dest => dest.Id, opt => opt.Ignore())
				.ForMember(dest => dest.DateTime, opt => opt.MapFrom(src => DateTime.Now));

			CreateMap<CourseInfoDto, Course>()
				.ForMember(dest => dest.Id, opt => opt.Ignore());

			CreateMap<ModuleInfoDto, Module>()
				.ForMember(dest => dest.Id, opt => opt.Ignore());

			CreateMap<LectureInfoDto, Lecture>()
				.ForMember(dest => dest.Id, opt => opt.Ignore());

			CreateMap<ContentUplaodDto, Content>()
				.ForMember(dest => dest.Id, opt => opt.Ignore())
				.ForMember(dest => dest.SystemFileName, opt => opt.MapFrom(src => Guid.NewGuid().ToString()))
				.ForMember(dest => dest.OriginalFileName, opt => opt.MapFrom(src => src.DataFile.FileName));
		}
	}
}
