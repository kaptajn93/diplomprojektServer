using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BetterWays.Api.BoundedContexts.CoachingCourses.Core.Repositories
{
    public interface ICoachingModuleResourceRevisionHistoryRepository
    {
        void CreateRevisionHistory(CoachingModuleResourceRevisionHistory revisionHistory);
        CoachingModuleResourceRevisionHistory GetRevisionHistoryById(Guid id);

    }
}
