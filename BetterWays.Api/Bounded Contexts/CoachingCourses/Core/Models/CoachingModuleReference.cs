using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models
{
    public class CoachingModuleReference
    {
        /// <summary>
        /// Reference to id of module
        /// </summary>
        [JsonProperty(PropertyName = "moduleReferenceId")]
        public Guid ModuleReferenceId { get; private set; }

        public CoachingModuleReference(Guid moduleId)
        {
            ModuleReferenceId = moduleId;
        }
    }
}