using Newtonsoft.Json;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Requests
{
    public class ShareVideoRequest
    {
        [JsonProperty(PropertyName = "videoUuid")]
        public string Uuid { get; set; }
    }
}