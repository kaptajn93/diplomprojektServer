using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises;
using BetterWays.Api.BoundedContexts.Shared.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.User
{
    public class UserCourseAdmission : ValueObject
    {
        public Guid CourseId { get; set; }

        public List<BaseScoreCard> Results { get; set; }
    }
}