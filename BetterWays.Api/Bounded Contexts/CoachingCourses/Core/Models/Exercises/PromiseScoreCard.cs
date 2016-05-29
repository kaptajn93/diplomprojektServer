using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises
{
    public class PromiseScoreCard : BaseScoreCard
    {
        [JsonProperty(PropertyName = "promiseText")]
        public string PromiseText { get; set; }

        [JsonProperty(PropertyName = "exerciseGoalText")]
        public string ExerciseGoalText { get; set; }

        [JsonProperty(PropertyName = "responses")]
        public List<QuestionResponse> Responses { get; set; }

        public PromiseScoreCard(CoachingModuleReference module, Guid exerciseId, string description)
            : base(module, exerciseId, description)
        {
            PromiseText = "";
            ExerciseGoalText = "";
        }
    }
}