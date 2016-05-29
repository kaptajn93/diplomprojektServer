using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Models;
using BetterWays.Api.BoundedContexts.Shared.Domain;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models
{
    public class CoachingModuleBaseResource : AggregateRoot
    {
        /// <summary>
        /// Time of creation
        /// </summary>
        [JsonProperty(PropertyName = "created")]
        public DateTime Created { get; set; }

        /// <summary>
        /// Version identification. Sequence from 1 to infinity 
        /// </summary>
        [JsonProperty(PropertyName = "version")]
        public int Version { get; set; }
        
        /// <summary>
        /// Owner of this revision
        /// </summary>
        [JsonProperty(PropertyName = "revisionHistory")]
        public ResourseRevisionHistoryReference RevisionHistory { get; set; }

        public CoachingModuleBaseResource()
        {
            Created = DateTime.Now;
            Version = 1;
        }
    }
}