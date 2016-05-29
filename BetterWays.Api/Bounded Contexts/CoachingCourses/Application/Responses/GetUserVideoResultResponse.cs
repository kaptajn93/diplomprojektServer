using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Responses
{
    public class GetUserVideoResultResponse
    {
        [JsonProperty(PropertyName = "scoreCard")]
        public ScoreCardDto ScoreCard { get; set; }

        [JsonProperty(PropertyName = "userFirstName")]
        public string UserFirstName { get; set; }
        [JsonProperty(PropertyName = "userLastName")]
        public string UserLastName { get; set; }
    }
}