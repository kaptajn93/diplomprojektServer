using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models;
using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs.Converters
{
    public static class CoachingModuleDTOConverter
    {
        public static CoachingModuleDTO ConvertToDTO(CoachingModule entity)
        {
            return new CoachingModuleDTO
            {
                Id = entity.Id,
                Name = entity.Name,
                Description = entity.Description,
                Peptalk = entity.Peptalk,
                Introduction = entity.Introduction.ResourceReferenceId,
                Exercise = entity.Exercise.ResourceReferenceId,
                Reflection = entity.Reflection.ResourceReferenceId,
                ModuleIndex = entity.ModuleIndex,
                GroupId = entity.GroupId
            };
        }

        public static ModuleGroupDTO ConvertToDTO(ModuleGroup group)
        {
            return new ModuleGroupDTO
            {
                GroupDescription = group.GroupDescription,
                GroupName = group.GroupName,
                GroupId = group.Id,
                GroupPriority = group.GroupPriority
            };
        }
    }
}