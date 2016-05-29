using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs.Converters
{
    public static class CoachingCourseDTOConverter
    {
        public static CoachingCourseDTO ConvertToDTO(CoachingCourse entity)
        {
            return new CoachingCourseDTO
            {
                Id = entity.Id,
                Name = entity.Name,
                Modules = entity.Modules.Select(m => m.ModuleReferenceId).ToList()
            };        
        }
    }
}