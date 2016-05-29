using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Requests
{
    public class InitiateDialogRequest
    {
        [JsonProperty(PropertyName = "userA")]
        public Guid UserA { get; set; }
        [JsonProperty(PropertyName = "userB")]
        public Guid UserB { get; set; }

        [JsonProperty(PropertyName = "userADescription")]
        public string UserADescription { get; set; }
        [JsonProperty(PropertyName = "userADescription")]
        public string UserBDescription { get; set; }
    }
}