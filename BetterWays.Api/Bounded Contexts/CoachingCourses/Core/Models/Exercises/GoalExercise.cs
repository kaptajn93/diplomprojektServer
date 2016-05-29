using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises
{
    public class GoalExercise : BaseExercise
    {
        public GoalExercise(CoachingModuleReference module)
            : base(module, "Goal")
        {

        }

        [JsonIgnore]
        public override string Configuration
        {
            get
            {
                return "";
            }
        }

        public override BaseScoreCard GetEmptyScoreCard()
        {
            return new GoalScoreCard(Module, Id, Description);
        }
    }
}
