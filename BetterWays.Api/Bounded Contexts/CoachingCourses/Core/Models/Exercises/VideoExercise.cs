using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises
{
    public class VideoExercise : BaseExercise
    {
        public VideoExercise(CoachingModuleReference module)
            : base(module, "VideoExercise")
        {
        }

        public override string Configuration
        {
            get { return ""; }
        }

        public override BaseScoreCard GetEmptyScoreCard()
        {
            var scoreCard = new VideoExerciseScoreCard(Module, Id, Description);
            return scoreCard;
        }
    }
}