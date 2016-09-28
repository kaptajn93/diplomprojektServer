﻿using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs.Converters;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Repositories;
using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Models;
using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Services;
using BetterWays.Api.BoundedContexts.CoachingCourses.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Controllers
{
    public class CourseController : ApiController
    {
        // GET api/values
        //[AllowAnonymous]
        public IEnumerable<CoachingCourseDTO> Get()
        {
            //TODO: Find user 
            var coachingCourseRepository = new CoachingCourseRepositoryDocumentDB();
            return coachingCourseRepository.GetAllItems().Select(c => CoachingCourseDTOConverter.ConvertToDTO(c));
        }

        // GET api/values/5
        public CoachingCourseDTO Get(Guid id)
        {
            var coachingCourseRepository = new CoachingCourseRepositoryDocumentDB();
            return CoachingCourseDTOConverter.ConvertToDTO(
                coachingCourseRepository.GetItems(i => i.Id == id).SingleOrDefault());
        }

        // POST api/values
        [Authorize(Roles = "Admin")]
        public Guid Post([FromBody]string courseName)
        {
            var coachingCourseRepository = new CoachingCourseRepositoryDocumentDB();
            var coachingModuleResourceRepository = new ModuleResourceRepositoryDocumentDb();
            var coachingModuleRepository = new CoachingModuleRepositoryDocumentDB();
            var exerciseRepository = new CoachnigModuleExerciseResourceRepositoryDocumentDB();
            var userRepository = new UserRepositoryDocumentDB();

            var coachingService = new CoachingCourseService(
                coachingCourseRepository, 
                coachingModuleResourceRepository, 
                coachingModuleRepository, 
                exerciseRepository, 
                userRepository);

            var course = coachingService.CreateNewCoachingCourse(courseName);

            return course.Id;
        }

        [Route("api/course/{courseId}/modules")]
        [AcceptVerbs("GET")]
        public IEnumerable<CoachingModuleDTO> Modules(Guid courseId)
        {
            var coachingCourseRepository = new CoachingCourseRepositoryDocumentDB();
            var coachingModuleRepository = new CoachingModuleRepositoryDocumentDB();

            //Get the course
            var course = coachingCourseRepository.GetCourseById(courseId);
            //Get modules in course
            var modules = coachingModuleRepository.GetItemsWithIds(course.Modules.Select(m => m.ModuleReferenceId)).OrderBy(m => m.ModuleIndex);

            return modules.Select(m => CoachingModuleDTOConverter.ConvertToDTO(m));
        }
        
        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}