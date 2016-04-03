using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs
{
    public class ModuleResultsDto
    {
        [JsonProperty(PropertyName = "module")]
        public CoachingModuleDTO Module { get; set; }

        [JsonProperty(PropertyName = "moduleResults")]
        public List<ScoreCardDto> ModuleResults { get; set; }
    }

    public class UserResultsDto
    {
        [JsonProperty(PropertyName = "activeModule")]
        public CoachingModuleDTO ActiveModule { get; set; }

        [JsonProperty(PropertyName = "moduleResults")]
        public List<ModuleResultsDto> ModuleResults { get; set; }

        [JsonProperty(PropertyName = "activeModuleIndex")]
        public int ActiveModuleIndex { get; set; }
    }
}