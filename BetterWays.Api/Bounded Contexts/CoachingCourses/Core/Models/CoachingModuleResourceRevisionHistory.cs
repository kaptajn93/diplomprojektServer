using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Repositories;
using BetterWays.Api.BoundedContexts.Shared.Domain;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BetterWays.Api.BoundedContexts.CoachingCourses.Core.Models
{
    public class CoachingModuleResourceRevisionHistory : AggregateRoot
    {

        public CoachingModuleResourceRevisionHistory()
        {
        }

        /// <summary>
        /// Add the new version to the revision history by adding reference to resource
        /// </summary>
        /// <param name="newVersion"></param>
        /// <param name="resourseRepos"></param>
        public void PushVersion(CoachingModuleResource newVersion, IModuleResourceRepository resourseRepos)
        {
            var last = resourseRepos.GetItems(i => i.RevisionHistory.ReferenceId == this.Id).OrderBy(i => i.Version).LastOrDefault();
            
            if (last != null)
                newVersion.Version = last.Version + 1;
            else
                newVersion.Version = 1;
            
            newVersion.RevisionHistory = new ResourseRevisionHistoryReference() { ReferenceId = Id };
        }

    }
}
