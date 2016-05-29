using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Repositories
{
    public interface ICoachigModuleExerciseResourceRepository
    {
        void CreateModuleResource(CoachingModuleExerciseResource resource);
        CoachingModuleExerciseResource GetResourceById(Guid id);
        IEnumerable<CoachingModuleExerciseResource> GetItems(Expression<Func<CoachingModuleExerciseResource, bool>> predicate);
        IEnumerable<CoachingModuleExerciseResource> GetExercisesWithIds(IEnumerable<Guid> ids);
    }
}
