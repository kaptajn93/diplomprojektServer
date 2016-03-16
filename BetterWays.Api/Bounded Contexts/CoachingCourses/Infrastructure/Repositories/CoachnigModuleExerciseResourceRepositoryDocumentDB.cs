using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Repositories;
using BetterWays.Api.BoundedContexts.Shared.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Repositories
{
    public class CoachnigModuleExerciseResourceRepositoryDocumentDB : DocumentDBRepository<CoachingModuleExerciseResource>, ICoachigModuleExerciseResourceRepository
    {
        public void CreateModuleResource(CoachingModuleExerciseResource resource)
        {
            var document = CreateItemAsync(resource);
        }

        public CoachingModuleExerciseResource GetResourceById(Guid id)
        {
            return GetItems(i => i.Id == id).Single();
        }
    }
}