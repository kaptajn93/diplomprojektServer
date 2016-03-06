using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Responses
{
    public class UpdateModuleResourceResponse
    {
        [JsonProperty(PropertyName = "updatedResouceId")]
        public Guid UpdatedResouceId { get; set; }

        [JsonProperty(PropertyName = "parentResourceId")]
        public Guid ParentResourceId { get; set; }

        [JsonProperty(PropertyName = "updatedResouceVersion")]
        public int UpdatedResouceVersion { get; set; }
    }
}