using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Requests
{
    public class UpdateModuleRequest
    {
        [JsonProperty(PropertyName = "coachingModule")]
        public CoachingModuleDTO CoachingModule { get; set; }
    }
}