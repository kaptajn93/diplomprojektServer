using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using BetterWays.Api.BoundedContexts.Shared.Domain;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models;

namespace BetterWays.Api.BoundedContexts.CoachingCourses.Core.Models
{
    public class CoachingModuleResource : CoachingModuleBaseResource
    {
        /// <summary>
        /// HTML conten
        /// </summary>
        [JsonProperty(PropertyName = "content")]
        public string Content { get; set; }

        public CoachingModuleResource()
        {
        }
		
    }
}
