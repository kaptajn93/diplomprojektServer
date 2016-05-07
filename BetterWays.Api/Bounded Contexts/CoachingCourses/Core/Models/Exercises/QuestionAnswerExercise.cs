using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises
{
    public class QuestionAnswerExercise : BaseExercise
    {
        public override string Configuration
        {
            get
            {
                return "";
            }
        }

        public override BaseScoreCard GetEmptyScoreCard()
        {
            return new QuestionAnswerScoreCard(Module, Id, Description);
        }

        public QuestionAnswerExercise(CoachingModuleReference module)
            : base(module, "QuestionAnswer")
        {

        }
    }
}