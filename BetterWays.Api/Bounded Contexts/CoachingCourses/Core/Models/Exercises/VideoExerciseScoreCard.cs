using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises
{
    public class VideoExerciseScoreCard : BaseScoreCard
    {
        public VideoExerciseScoreCard(CoachingModuleReference module, Guid exerciseId, string description)
            : base(module, exerciseId, description)
        {

        }
    }
}