using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises
{
    public class EvaluationResult
    {
        [JsonProperty(PropertyName = "title")]
        public string Title { get; set; }

        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }
        [JsonProperty(PropertyName = "meaning")]
        public string Meaning { get; set; }
        [JsonProperty(PropertyName = "effect")]
        public string Effect { get; set; }
    }

    public class SortAndEvaluateScoreCard : BaseScoreCard
    {
        /// <summary>
        /// Ordered evaluation results
        /// </summary>
        [JsonProperty(PropertyName = "evaluations")]
        public List<EvaluationResult> Evaluations { get; set; }

        public SortAndEvaluateScoreCard(CoachingModuleReference module, Guid exerciseId, string description)
            : base(module, exerciseId, description)
        {

        }

    }
}