using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs
{
    public class ModuleGroupDTO
    {
        [JsonProperty(PropertyName = "groupId")]
        public Guid GroupId { get; set; }

        [JsonProperty(PropertyName = "groupName")]
        public string GroupName { get; set; }

        [JsonProperty(PropertyName = "groupDescription")]
        public string GroupDescription { get; set; }

        [JsonProperty(PropertyName = "groupPriority")]
        public int GroupPriority { get; set; }
    }
}