using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BetterWays.Api.BoundedContexts.CoachingCourses.Core.Repositories
{
    public interface ICoachingModuleResourceRepository
    {
        void CreateModuleResource(CoachingModuleResource resource);
        CoachingModuleResource GetResourceById(Guid id);
        IEnumerable<CoachingModuleResource> GetItems(Expression<Func<CoachingModuleResource, bool>> predicate);
    }
}
