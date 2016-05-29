using BetterWays.Api.BoundedContexts.Shared.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises
{
    public abstract class BaseExercise : Entity
    {
        /// <summary>
        /// The name of the class, used by the client to find the matching ui-component
        /// </summary>
        public string ExerciseClassName { get; private set; }

        public abstract string Configuration { get; }

        public List<string> InstrunctionContent { get; set; }

        public string Description { get; set; }

        public CoachingModuleReference Module { get; private set; }
        
        /// <summary>
        /// The resulting score card, after the user has solved the exercise
        /// </summary>
        /// <returns></returns>
        public abstract BaseScoreCard GetEmptyScoreCard();

        public BaseExercise(CoachingModuleReference module, string className)
        {
            Module = module;
            ExerciseClassName = className;
            Description = "";
            InstrunctionContent = new List<string>();
        }
    }
}