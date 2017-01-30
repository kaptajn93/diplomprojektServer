using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs.Converters;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Repositories;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Requests;
using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Models;
using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Services;
using BetterWays.Api.BoundedContexts.CoachingCourses.Infrastructure.Repositories;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;


namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Controllers
{
    public class ModuleController : ApiController
    {
        CoachingCourseRepositoryDocumentDB coachingCourseRepository = new CoachingCourseRepositoryDocumentDB();
        CoachingModuleRepositoryDocumentDB coachingModuleRepository = new CoachingModuleRepositoryDocumentDB();
        ModuleResourceRepositoryDocumentDb coachingModuleResourceRepository = new ModuleResourceRepositoryDocumentDb();

        // GET api/values
        public IEnumerable<CoachingModuleDTO> Get()
        {
            //TODO: Find user 
            //var coachingModuleRepository = new CoachingModuleRepositoryDocumentDB();
            return coachingModuleRepository.GetAllItems().Select(c => CoachingModuleDTOConverter.ConvertToDTO(c));
        }

        // GET api/5
        public CoachingModuleDTO Get(Guid id)
        {
            //var coachingModuleRepository = new CoachingModuleRepositoryDocumentDB();
            return CoachingModuleDTOConverter.ConvertToDTO(
                coachingModuleRepository.GetItems(i => i.Id == id).SingleOrDefault());
        }

        // POST api/values
        [Authorize(Roles = "Admin")]
        public Guid Post(CreateModuleInCourseRequest request)
        {
            //var coachingCourseRepository = new CoachingCourseRepositoryDocumentDB();
            //var coachingModuleResourceRepository = new ModuleResourceRepositoryDocumentDb();
            //var coachingModuleRepository = new CoachingModuleRepositoryDocumentDB();
            var exerciseRepository = new CoachnigModuleExerciseResourceRepositoryDocumentDB();
            var userRepository = new UserRepositoryDocumentDB();

            var coachingService = new CoachingCourseService(
                coachingCourseRepository,
                coachingModuleResourceRepository,
                coachingModuleRepository,
                exerciseRepository,
                userRepository);

            var course = coachingCourseRepository.GetCourseById(request.CourseId);
            var module = coachingService.CreateNewModuleInCourse(course, request.ModuleName, 0);

            return course.Id;
        }

        [Authorize(Roles = "Admin")]
        public void Put(UpdateModuleRequest request)
        {
            //var coachingModuleRepository = new CoachingModuleRepositoryDocumentDB();
            //var coachingModuleResourceRepository = new ModuleResourceRepositoryDocumentDb();

            var coachingModule = coachingModuleRepository.GetModuleById(request.CoachingModule.Id);
            var introduction = coachingModuleResourceRepository.GetResourceById(request.CoachingModule.Introduction);
            var exercise = coachingModuleResourceRepository.GetResourceById(request.CoachingModule.Exercise);
            var reflection = coachingModuleResourceRepository.GetResourceById(request.CoachingModule.Reflection);

            coachingModule.Name = request.CoachingModule.Name;
            coachingModule.Description = request.CoachingModule.Description;
            coachingModule.Peptalk = request.CoachingModule.Peptalk;
            coachingModule.Introduction = new CoachingModuleResourceReference(introduction.Id, introduction.RevisionHistory.ReferenceId);
            coachingModule.Exercise = new CoachingModuleResourceReference(exercise.Id, exercise.RevisionHistory.ReferenceId);
            coachingModule.Reflection = new CoachingModuleResourceReference(reflection.Id, reflection.RevisionHistory.ReferenceId);
            coachingModuleRepository.SaveItem(coachingModule);
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }

        [Route("api/module/{moduleId}/description")]
        [AcceptVerbs("PUT")]
        [Authorize(Roles = "Admin")]
        public void UpdateModuleDescription(Guid moduleId, [FromBody] string description)
        {
            //var coachingModuleRepository = new CoachingModuleRepositoryDocumentDB();
            //var coachingModuleResourceRepository = new ModuleResourceRepositoryDocumentDb();

            var coachingModule = coachingModuleRepository.GetModuleById(moduleId);
            coachingModule.Description = description;
            coachingModuleRepository.SaveItem(coachingModule);
        }

        [Route("api/module/{moduleId}/exercises")]
        [AcceptVerbs("GET")]
        public dynamic GetModuleExercises(Guid moduleId, [FromBody] string description)
        {
            //var coachingModuleRepository = new CoachingModuleRepositoryDocumentDB();
            //var coachingModuleResourceRepository = new CoachnigModuleExerciseResourceRepositoryDocumentDB();
            var coachingModule = coachingModuleRepository.GetModuleById(moduleId);

            //Get all exercises
            var resources = coachingModuleResourceRepository.GetItemsWithIds(new Guid[] {
                coachingModule.Exercise.ResourceReferenceId, coachingModule.Reflection.ResourceReferenceId });

            return new
            {
                title = coachingModule.Name,
                exercises = resources.Select(r => ModuleResourceDTOConverter.ConvertToDTO(r))
            };
        }

        //burde virke, men benyttes ikke endnu
        //Tager en liste af brugere og sætter moduleGroupPriority lig med hvad der er angivet i en liste af keyValuePair <navn, priority> 
        [Route("api/module/updateModuleGroupPriority")]
        public void UpdateModuleGroupPriority([FromBody]List<KeyValuePair<string, int>> groupNameAndPriority, [FromBody]List<User> users)
        {
            var moduleGroupDb = new ModuleGroupRepositoryDocumentDB();

            foreach (var user in users)
            {
                var userId = user.Id;
                var course = coachingCourseRepository.GetCourseById(userId);
                var moduleGroups = moduleGroupDb.GetItemsWithIds(course.ModuleGroups);

                foreach (var group in groupNameAndPriority)
                {
                    var something = moduleGroups.FirstOrDefault(f => f.GroupName == group.Key);
                    switch (something.GroupName)
                    {
                        case "Læg en plan og hold den":
                            something.GroupPriority = group.Value;
                            moduleGroupDb.SaveItem(something);
                            break;
                        case "Dit talent og din profil":
                            something.GroupPriority = group.Value;
                            moduleGroupDb.SaveItem(something);
                            break;
                        case "Gør dig synlig":
                            something.GroupPriority = group.Value;
                            moduleGroupDb.SaveItem(something);
                            break;
                        case "Nå dit mål":
                            something.GroupPriority = group.Value;
                            moduleGroupDb.SaveItem(something);
                            break;
                    }
                }
            }
        }









    }
}