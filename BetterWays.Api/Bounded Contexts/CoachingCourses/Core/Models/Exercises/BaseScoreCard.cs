using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises
{
    public abstract class BaseScoreCard
    {
        public bool IsCompleted { get; set; }

        public CoachingModuleReference Module { get; private set; }
    }
}