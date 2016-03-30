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
                Configuration = element.Exercise != null ? element.Exercise.Configuration : null,
                Content = element.Content
            };
        }

        public static ResourceExerciseElement ConvertFromDTO(ModuleExerciseElementDTO dto, CoachingModule module)
        {
            BaseExercise exercise = null;
            var moduleReference = new CoachingModuleReference(module.Id) ;
            switch (dto.ClassName)
            {
                case "SortAndEvaluate":
                    exercise = new SortAndEvaluateExercise(dto.Configuration.Split(',').ToList(), moduleReference);
                    break;
                case "VideoExercise":
                    exercise = new VideoExercise(moduleReference);
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