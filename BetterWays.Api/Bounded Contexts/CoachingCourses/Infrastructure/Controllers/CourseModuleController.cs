using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs.Converters;
using BetterWays.Api.BoundedContexts.CoachingCourses.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Controllers
{
    public class CourseModuleController : ApiController
    {
        // GET api/5
        public IEnumerable<CoachingModuleDTO> Get(Guid id)
        {
            var coachingCourseRepository = new CoachingCourseRepositoryDocumentDB();
            var coachingModuleRepository = new CoachingModuleRepositoryDocumentDB();

            //Get the course
            var course = coachingCourseRepository.GetCourseById(id);
            //Get modules in course
            var modules = coachingModuleRepository.GetItemsWithIds(course.Modules.Select(m => m.ModuleReferenceId));

            return modules.Select(m => CoachingModuleDTOConverter.ConvertToDTO(m));
        }
        
    }
}