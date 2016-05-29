using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BetterWays.Api.BoundedContexts.CoachingCourses.Core.Repositories
{
    public interface ICoachingModuleRepository
    {
        void CreateModule(CoachingModule module);
        CoachingModule GetModuleById(Guid id);
        void SaveModule(CoachingModule module);

        IEnumerable<CoachingModule> GetModulesWithIds(IEnumerable<Guid> ids);
    }
}
