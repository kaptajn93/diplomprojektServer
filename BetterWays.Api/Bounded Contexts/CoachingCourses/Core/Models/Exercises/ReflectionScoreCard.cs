using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises
{
    public class ReflectionScoreCard : BaseScoreCard
    {
        [JsonProperty(PropertyName = "responses")]
        public List<QuestionResponse> Responses { get; set; }

        public ReflectionScoreCard(CoachingModuleReference module, Guid exerciseId, string description)
            : base(module, exerciseId, description)
        {

        }
    }
}