using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises
{
    public class SortAndEvaluateExercise : BaseExercise
    {
        public List<string> Sorables { get; set; }
        
        public override BaseScoreCard GetEmptyScoreCard()
        {
            return new SortAndEvaluateScoreCard();
        }

        public SortAndEvaluateExercise()
        {
            this.ExerciseClassName = "SortAndEvaluate";
        }
    }
}