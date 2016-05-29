using Newtonsoft.Json;
using System;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Requests
{
    public class ShareVideoRequest
    {
        [JsonProperty(PropertyName = "videoUuid")]
        public string Uuid { get; set; }

        [JsonProperty(PropertyName = "exerciseId")]
        public Guid ExerciseId { get; set; }
    }
}