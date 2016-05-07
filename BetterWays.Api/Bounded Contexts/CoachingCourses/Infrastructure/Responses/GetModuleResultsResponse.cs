using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Responses
{
    public class GetModuleResultsResponse
    {
        [JsonProperty(PropertyName = "isActive")]
        public bool IsActive { get; set; }

        [JsonProperty(PropertyName = "isCompleted")]
        public bool IsCompleted { get; set; }

        [JsonProperty(PropertyName = "moduleResults")]
        public List<ScoreCardDto> ModuleResults { get; set; }

        [JsonProperty(PropertyName = "activeScoreCard")]
        public ScoreCardDto ActiveScoreCard { get; set; }

    }
}