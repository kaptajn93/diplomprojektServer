using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs
{
    public class ScoreCardDto
    {
        [JsonProperty(PropertyName = "isCompleted")]
        public bool IsCompleted { get; set; }

        [JsonProperty(PropertyName = "moduleId")]
        public Guid ModuleId { get; set; }
    }
}