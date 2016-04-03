using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises
{
    public class QuestionResponse
    {
        [JsonProperty(PropertyName = "score")]
        public int Score { get; set; }
        [JsonProperty(PropertyName = "question")]
        public string Question { get; set; }
    }

    public class KPExplorerQuestionnaireScoreCard : BaseScoreCard
    {
        [JsonProperty(PropertyName = "responses")]
        public List<QuestionResponse> Responses { get; set; }
        public KPExplorerQuestionnaireScoreCard(CoachingModuleReference module, Guid exerciseId, string description)
            : base(module, exerciseId, description)
        {

        }

    }
}