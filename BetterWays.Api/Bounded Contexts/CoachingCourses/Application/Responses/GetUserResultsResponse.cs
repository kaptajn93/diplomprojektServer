using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Responses
{
    public class GetUserResultsResponse
    {
        [JsonProperty(PropertyName = "activeModule")]
        public CoachingModuleDTO ActiveModule { get; set; }

        [JsonProperty(PropertyName = "moduleResults")]
        public List<ModuleResultsDto> ModuleResults { get; set; }

        [JsonProperty(PropertyName = "activeModuleIndex")]
        public int ActiveModuleIndex { get; set; }

        [JsonProperty(PropertyName = "groups")]
        public IEnumerable<ModuleGroupDTO> Groups { get; set; }

        [JsonProperty(PropertyName = "user")]
        public BaseUserDto User { get; set; }
    }
}