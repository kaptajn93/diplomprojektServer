using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs.Converters
{
    public class UserDtoConverter
    {
        public static UserDto ConvertToDTO(User entity)
        {
            return new UserDto
            {
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                CourseAdmissions = entity.CourseAdmissions != null ? entity.CourseAdmissions.Select(ConvertCourseadmissionToDTO).ToList() : null
            };
        }

        public static CourseAdmissionDto ConvertCourseadmissionToDTO(UserCourseAdmission entity)
        {
            return new CourseAdmissionDto
            {
                CourseId = entity.CourseId,
                Results = entity.Results.Select(ConvertScoreCardDto).ToList()
            };
        }

        public static ScoreCardDto ConvertScoreCardDto(BaseScoreCard entity)
        {
            return new ScoreCardDto
            {
                IsCompleted = entity.IsCompleted,
                ModuleId = entity.Module.ModuleReferenceId
            };
        }
    }
}