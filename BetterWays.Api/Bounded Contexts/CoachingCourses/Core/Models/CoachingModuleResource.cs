using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using BetterWays.Api.BoundedContexts.Shared.Domain;

namespace BetterWays.Api.BoundedContexts.CoachingCourses.Core.Models
{
    public class CoachingModuleResource : AggregateRoot
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
        /// HTML conten
        /// </summary>
        [JsonProperty(PropertyName = "content")]
        public string Content { get; set; }

        /// <summary>
        /// Owner of this revision
        /// </summary>
        [JsonProperty(PropertyName = "revisionHistory")]
        public ResourseRevisionHistoryReference RevisionHistory { get; set; }

        public CoachingModuleResource()
        {
            Created = DateTime.Now;
            Version = 1;
        }
		
    }
}
