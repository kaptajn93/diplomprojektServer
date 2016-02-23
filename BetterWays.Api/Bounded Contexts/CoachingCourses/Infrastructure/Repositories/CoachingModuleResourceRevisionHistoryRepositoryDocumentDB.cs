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
    public class CoachingModuleResourceRevisionHistoryRepositoryDocumentDB : DocumentDBRepository<CoachingModuleResourceRevisionHistory>, ICoachingModuleResourceRevisionHistoryRepository
    {
        public void CreateRevisionHistory(CoachingModuleResourceRevisionHistory revisionHistory)
        {
            CreateItemAsync(revisionHistory);
        }
        
        public CoachingModuleResourceRevisionHistory GetRevisionHistoryById(Guid id)
        {
            return GetItems(i => i.Id == id).Single();
        }
    }
}
