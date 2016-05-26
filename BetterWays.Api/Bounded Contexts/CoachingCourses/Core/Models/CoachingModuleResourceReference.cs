using BetterWays.Api.BoundedContexts.Shared.Domain;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BetterWays.Api.BoundedContexts.CoachingCourses.Core.Models
{
    public class CoachingModuleResourceReference : ValueObject
    {
        /// <summary>
        /// Reference to id of its resource
        /// </summary>
        [JsonProperty(PropertyName = "resourceReferenceId")]
        public Guid ResourceReferenceId { get; private set; }

        /// <summary>
        /// Reference to id of its aassociated revision history
        /// </summary>
        [JsonProperty(PropertyName = "revisionHistoryReferenceId")]
        public Guid RevisionHistoryReferenceId { get; private set; }

        public CoachingModuleResourceReference(Guid resourceReference, Guid revisionHistoryReference)
        {
            ResourceReferenceId = resourceReference;
            RevisionHistoryReferenceId = revisionHistoryReference;
        }

    }
}
