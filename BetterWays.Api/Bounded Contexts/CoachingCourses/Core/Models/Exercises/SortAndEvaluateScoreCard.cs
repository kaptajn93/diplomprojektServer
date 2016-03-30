using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises
{
    public class EvaluationResult
    {
        public string Description { get; set; }
        public string Meaning { get; set; }
        public string Effect { get; set; }
    }

    public class SortAndEvaluateScoreCard : BaseScoreCard
    {
        /// <summary>
        /// Ordered evaluation results
        /// </summary>
        public List<EvaluationResult> Evaluations { get; set; }

    }
}