using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises
{
    public class QuestionAnswerScoreCard : BaseScoreCard
    {
        [JsonProperty(PropertyName = "answer")]
        public string Answer { get; set; }

        public QuestionAnswerScoreCard(CoachingModuleReference module, Guid exerciseId, string exerciseDescription)
            : base(module, exerciseId, exerciseDescription)
        {

        }
    }
}