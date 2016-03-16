using BetterWays.Api.BoundedContexts.Shared.Domain;
using Newtonsoft.Json;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.User
{
    public class User : AggregateRoot
    {
        [JsonProperty(PropertyName = "firstName")]
        public string FirstName { get; set; }
        [JsonProperty(PropertyName = "lastName")]
        public string LastName { get; set; }

        [JsonProperty(PropertyName = "password")]
        public string Password { get; set; }

        [JsonProperty(PropertyName = "facebookId")]
        public string FacebookId { get; set; }
    }
}