using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Requests
{
    public class PostVideoReplyRequest
    {
        [JsonProperty(PropertyName = "reply")]
        public string Reply { get; set; }
    }
}