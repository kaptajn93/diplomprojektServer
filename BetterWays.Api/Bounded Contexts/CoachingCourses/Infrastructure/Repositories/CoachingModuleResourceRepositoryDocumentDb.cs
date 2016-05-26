using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models;
using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Models;
using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Repositories;
using BetterWays.Api.BoundedContexts.Shared.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BetterWays.Api.BoundedContexts.CoachingCourses.Infrastructure.Repositories
{
    public class ModuleResourceRepositoryDocumentDb : DocumentDBRepository<CoachingModuleResource>, IModuleResourceRepository
    {
        public void CreateModuleResource(CoachingModuleResource resource)
        {
            var document = CreateItemAsync(resource);
        }

        public CoachingModuleResource GetResourceById(Guid id)
        {
            return GetItems(i => i.Id == id).Single();
        }

    }
}
