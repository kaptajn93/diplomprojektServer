using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Models;
using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Repositories;
using BetterWays.Api.BoundedContexts.Shared.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BetterWays.Api.BoundedContexts.CoachingCourses.Infrastructure.Repositories
{
    public class CoachingCourseRepositoryDocumentDB : DocumentDBRepository<CoachingCourse>, ICoachingCourseRepository
    {
        public void CreateCoachingCourse(CoachingCourse course)
        {
            var document = CreateItemAsync(course);
        }

        public void SaveCoachingCourse(CoachingCourse coachingCourse)
        {
            SaveItem(coachingCourse);
        }
    }
}
