using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises;
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

        public static ModuleExerciseResourceDTO ConvertToDTO(CoachingModuleExerciseResource entity)
        {
            return new ModuleExerciseResourceDTO
            {
                Id = entity.Id,
                Created = entity.Created,
                Version = entity.Version,
                Elements = entity.Elements.Select(e => ConvertToDTO(e)).ToList()
            };
        }

        private static ModuleExerciseElementDTO ConvertToDTO(ResourceExerciseElement element)
        {
            return new ModuleExerciseElementDTO
            {
                ClassName = element.Exercise != null ? element.Exercise.ExerciseClassName : null,
                Content = element.Content
            };
        }

        public static ResourceExerciseElement ConvertFromDTO(ModuleExerciseElementDTO dto)
        {
            BaseExercise exercise = null;
            switch (dto.ClassName)
            {
                case "ModuleExerciseElementDTO":
                    exercise = new SortAndEvaluateExercise();
                    break;
                default:
                    break;
            }

            return new ResourceExerciseElement(dto.Content)
            {
                Exercise = exercise
            };
        }
    }
}