using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs.Converters;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Repositories;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Requests;
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
    public class ModuleController : ApiController
    {
        // GET api/values
        public IEnumerable<CoachingModuleDTO> Get()
        {
            //TODO: Find user 
            var coachingModuleRepository = new CoachingModuleRepositoryDocumentDB();
            return coachingModuleRepository.GetAllItems().Select(c => CoachingModuleDTOConverter.ConvertToDTO(c));
        }

        // GET api/5
        public CoachingModuleDTO Get(Guid id)
        {
            var coachingModuleRepository = new CoachingModuleRepositoryDocumentDB();
            return CoachingModuleDTOConverter.ConvertToDTO(
                coachingModuleRepository.GetItems(i => i.Id == id).SingleOrDefault());
        }

        // POST api/values
        public Guid Post(CreateModuleInCourseRequest request)
        {
            var coachingCourseRepository = new CoachingCourseRepositoryDocumentDB();
            var coachingModuleResourceRepository = new ModuleResourceRepositoryDocumentDb();
            var coachingModuleRepository = new CoachingModuleRepositoryDocumentDB();
            var exerciseRepository = new CoachnigModuleExerciseResourceRepositoryDocumentDB();

            var coachingService = new CoachingCourseService(coachingCourseRepository, coachingModuleResourceRepository, coachingModuleRepository, exerciseRepository);

            var course = coachingCourseRepository.GetCourseById(request.CourseId);

            var module = coachingService.CreateNewModuleInCourse(course, request.ModuleName);

            return course.Id;
        }

        public void Put(UpdateModuleRequest request)
        {
            var coachingModuleRepository = new CoachingModuleRepositoryDocumentDB();
            var coachingModuleResourceRepository = new ModuleResourceRepositoryDocumentDb();

            var coachingModule = coachingModuleRepository.GetModuleById(request.CoachingModule.Id);
            var introduction = coachingModuleResourceRepository.GetResourceById(request.CoachingModule.Introduction);
            var exercise = coachingModuleResourceRepository.GetResourceById(request.CoachingModule.Exercise);
            var reflection = coachingModuleResourceRepository.GetResourceById(request.CoachingModule.Reflection);

            coachingModule.Name = request.CoachingModule.Name;
            coachingModule.Introduction = new CoachingModuleResourceReference(introduction.Id, introduction.RevisionHistory.ReferenceId);
            coachingModule.Exercise = new CoachingModuleResourceReference(exercise.Id, exercise.RevisionHistory.ReferenceId);
            coachingModule.Reflection = new CoachingModuleResourceReference(reflection.Id, reflection.RevisionHistory.ReferenceId);

            coachingModuleRepository.SaveItem(coachingModule);
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    
    }
}