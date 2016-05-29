using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises
{
    public class GoalScoreCard : BaseScoreCard
    {
        [JsonProperty(PropertyName = "goalText")]
        public string GoalText { get; set; }

        [JsonProperty(PropertyName = "previousModulePromiseText")]
        public string PreviousModulePromiseText { get; set; }

        public GoalScoreCard(CoachingModuleReference module, Guid exerciseId, string description)
            : base(module, exerciseId, description)
        {
            GoalText = "";
            PreviousModulePromiseText = "";
        }
    }
}