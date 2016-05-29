using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Repositories;
using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Models;
using BetterWays.Api.BoundedContexts.Shared.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.BoundedContexts.CoachingCourses.Infrastructure.Repositories
{
    public class CoachingModuleRepositoryDocumentDB : DocumentDBRepository<CoachingModule>, ICoachingModuleRepository
    {
        public void CreateModule(CoachingModule module)
        {
            CreateItemAsync(module);
        }

        public CoachingModule GetModuleById(Guid id)
        {
            return GetItems(i => i.Id == id).Single();
        }

        public IEnumerable<CoachingModule> GetModulesWithIds(IEnumerable<Guid> ids)
        {
            return GetItemsWithIds(ids);
        }

        public void SaveModule(CoachingModule module)
        {
            SaveItem(module);
        }

    }
}