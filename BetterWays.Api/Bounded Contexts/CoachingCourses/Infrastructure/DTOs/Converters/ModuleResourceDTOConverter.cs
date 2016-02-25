using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs.Converters
{
    public static class ModuleResourceDTOConverter
    {
        public static ModuleResourceDTO ConvertToDTO(CoachingModuleResource entity)
        {
            return new ModuleResourceDTO
            {
                Id = entity.Id,
                Created = entity.Created,
                Version = entity.Version,
                Content = entity.Content
            };
        }
    }
}