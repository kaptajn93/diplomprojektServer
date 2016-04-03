using BetterWays.Api.BoundedContexts.Shared.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises
{
    public class BaseScoreCard 
    {
        public bool IsCompleted { get; set; }

        public string ExerciseDescription { get; set; }

        public Guid ExerciseId { get; set; }

        public CoachingModuleReference Module { get; private set; }
        
        public BaseScoreCard(CoachingModuleReference module, Guid exerciseId, string exerciseDescription)
        {
            Module = module;
            ExerciseDescription = exerciseDescription;
            ExerciseId = exerciseId;
        }
    }
}