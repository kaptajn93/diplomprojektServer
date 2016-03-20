using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises
{
    public abstract class BaseExercise
    {
        /// <summary>
        /// The name of the class, used by the client to find the matching ui-component
        /// </summary>
        public string ExerciseClassName { get; protected set; }

        public abstract string Configuration { get; }

        /// <summary>
        /// The resulting score card, after the user has solved the exercise
        /// </summary>
        /// <returns></returns>
        public abstract BaseScoreCard GetEmptyScoreCard();
    }
}