using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.User;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Repositories;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Services;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Repositories;
using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Models;
using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BetterWays.Api.BoundedContexts.CoachingCourses.Core.Services
{
    public class CoachingCourseService
    {
        private ICoachingCourseRepository _coachingCourseRepository;
        private IModuleResourceRepository _resourceRepository;
        private ICoachingModuleRepository _moduleRepository;
        private ICoachigModuleExerciseResourceRepository _exerciseRepository;
        private IUserRepository _userRepository;

        public CoachingCourseService(
            ICoachingCourseRepository coachingCourserepository, 
            IModuleResourceRepository resourceRpository,
            ICoachingModuleRepository moduleRepository,
            ICoachigModuleExerciseResourceRepository exerciseRepository,
            IUserRepository userRepository)
        {
            _coachingCourseRepository = coachingCourserepository;
            _resourceRepository = resourceRpository;
            _moduleRepository = moduleRepository;
            _exerciseRepository = exerciseRepository;
            _userRepository = userRepository;
        }

        public CoachingCourse CreateNewCoachingCourse(string courseName)
        {
            var course = new CoachingCourse(courseName);
            _coachingCourseRepository.CreateCoachingCourse(course);

            return course;
        }

        public CoachingModule CreateNewModuleInCourse(CoachingCourse coachingCourse, string moduleName, int index)
        {
            //Create resources with default content
            //TODO: Load the default content from somewhere
            var introduction = new CoachingModuleResource() { Content = "<h1>&lt;Overskrift her&gt;</h1> <p>&lt;Kort tekst her&gt;</p> <div data-oembed-url='https://vimeo.com/ricardonilsson/coachingwill'> <div style='left: 0px; width: 100%; height: 0px; position: relative; padding-bottom: 56.2493%;'><iframe allowfullscreen='true' frameborder='0' mozallowfullscreen='true' src='//player.vimeo.com/video/77308630?byline=0&amp;badge=0&amp;portrait=0&amp;title=0' style='top: 0px; left: 0px; width: 100%; height: 100%; position: absolute;' webkitallowfullscreen='true'></iframe></div> </div> <h2>&lt;Overskrift, start p&aring; udvidet intro&gt;</h2> <p>&lt;Intro her&gt;</p> <h2>&lt;Overskrift, eksterne henvisninger&gt;</h2> <p><a href='http://wikipedia.org'>&lt;Eksempel p&aring; link&gt;</a></p>" };
            var exercise = new CoachingModuleExerciseResource() { Elements = new List<ResourceExerciseElement>()
            {
                new ResourceExerciseElement(""),
                new ResourceExerciseElement("<h1>&lt;Overskrift her&gt;</h1>  <p>&lt;Kort tekst her, evt. efterfulgt af opgave: &gt;</p> ")
            } };
            var reflection = new CoachingModuleExerciseResource() { Elements = new List<ResourceExerciseElement>()
            {
                new ResourceExerciseElement("")
            } };
            
            //Create revsions for new content
            var introRevision = Guid.NewGuid();
            PushResourceVersion(introduction, introRevision);
            var exerciseRevision = Guid.NewGuid();
            PushResourceVersion(exercise, exerciseRevision);
            var reflectionRevision = Guid.NewGuid();
            PushResourceVersion(reflection, reflectionRevision);

            //Create and add module
            var module = new CoachingModule(
                moduleName,
                introduction, exercise, reflection);
            module.ModuleIndex = index;

            exercise.Elements[0].Exercise = new GoalExercise(new CoachingModuleReference(module.Id));
            reflection.Elements[0].Exercise = new PromiseExercise(new List<string>() { "Resultatet af øvelsen levede op til mine forventinger" }, new CoachingModuleReference(module.Id)) { };

            //Save resources
            _resourceRepository.CreateModuleResource(introduction);
            _exerciseRepository.CreateModuleResource(exercise);
            _exerciseRepository.CreateModuleResource(reflection);
            
            _moduleRepository.SaveModule(module);

            coachingCourse.AddCoachingModule(module);
            _coachingCourseRepository.SaveCoachingCourse(coachingCourse);
            
            //Return new module
            return module;
        }

        /// <summary>
        /// Add the new version to the revision history by adding reference to resource
        /// </summary>
        /// <param name="newVersion"></param>
        /// <param name="revisionId"></param>
        /// <param name="resourseRepos"></param>
        private void PushResourceVersion(CoachingModuleBaseResource newVersion, Guid revisionId)
        {
            CoachingModuleBaseResource last = null;
            if (newVersion is CoachingModuleResource)
                last = _resourceRepository.GetItems(i => i.RevisionHistory.ReferenceId == revisionId).OrderBy(i => i.Version).LastOrDefault();
            else if (newVersion is CoachingModuleExerciseResource)
                last = _exerciseRepository.GetItems(i => i.RevisionHistory.ReferenceId == revisionId).OrderBy(i => i.Version).LastOrDefault();


            if (last != null)
                newVersion.Version = last.Version + 1;
            else
                newVersion.Version = 1;

            newVersion.RevisionHistory = new ResourseRevisionHistoryReference() { ReferenceId = revisionId };
        }
        
        public void UpdateModuleResurce(CoachingModule module, CoachingModuleBaseResource newResource)
        {
            var resource = new CoachingModuleResourceReference(newResource.Id, newResource.RevisionHistory.ReferenceId);

            //Create the new version
            PushResourceVersion(newResource, resource.RevisionHistoryReferenceId);

            //Update the module revision
            if (module.Introduction.RevisionHistoryReferenceId == resource.RevisionHistoryReferenceId)
                module.Introduction = new CoachingModuleResourceReference(newResource.Id, newResource.RevisionHistory.ReferenceId);
            else if (module.Exercise.RevisionHistoryReferenceId == resource.RevisionHistoryReferenceId)
                module.Exercise = new CoachingModuleResourceReference(newResource.Id, newResource.RevisionHistory.ReferenceId);
            else if (module.Reflection.RevisionHistoryReferenceId == resource.RevisionHistoryReferenceId)
                module.Reflection = new CoachingModuleResourceReference(newResource.Id, newResource.RevisionHistory.ReferenceId);

            //Save
            _moduleRepository.SaveModule(module);

            if (newResource is CoachingModuleResource)
                _resourceRepository.CreateModuleResource(newResource as CoachingModuleResource);
            else if (newResource is CoachingModuleExerciseResource)
                _exerciseRepository.CreateModuleResource(newResource as CoachingModuleExerciseResource);
            
        }

        public void AdmitUserToCourse(User user, CoachingCourse course)
        {
            //Find all exercises and get a fresh scorecard
            var modules = _moduleRepository.GetModulesWithIds(course.Modules.Select(m => m.ModuleReferenceId)).ToList();
            var exercises = _exerciseRepository.GetExercisesWithIds(modules.SelectMany(m => new[] { m.Exercise.ResourceReferenceId, m.Reflection.ResourceReferenceId })).ToList();

            var freshScoreCards = exercises.SelectMany(er => er.Elements.Select(e => 
                e.Exercise != null ? 
                    e.Exercise.GetEmptyScoreCard() : 
                    new BaseScoreCard(
                        new CoachingModuleReference( modules.Single(m => 
                        m.Exercise.ResourceReferenceId == er.Id).Id), Guid.NewGuid(), "")));

            //Add course admission to user
            if (user.CourseAdmissions == null)
                user.CourseAdmissions = new List<UserCourseAdmission>();
            
            user.CourseAdmissions.Add(new UserCourseAdmission
            {
                CourseId = course.Id,
                Results = freshScoreCards.ToList()
            });

            //Save user
            _userRepository.SaveUser(user);
            
        }

        public void ResetCourse(User user, UserCourseAdmission courseAdmission, int startingModule)
        {
            user.CourseAdmissions.Remove(courseAdmission);

            var course = _coachingCourseRepository.GetCourseById(courseAdmission.CourseId);
            //Find all exercises and get a fresh scorecard
            var modules = _moduleRepository.GetModulesWithIds(course.Modules.Select(m => m.ModuleReferenceId)).OrderBy(m => m.ModuleIndex).ToList();

            var exercises = _exerciseRepository.GetExercisesWithIds(modules.SelectMany(m => new[] { m.Exercise.ResourceReferenceId, m.Reflection.ResourceReferenceId })).ToList();

            var freshScoreCards = exercises.SelectMany(er => er.Elements.Select(e =>
                e.Exercise != null ?
                    e.Exercise.GetEmptyScoreCard() :
                    new BaseScoreCard(
                        new CoachingModuleReference(modules.Single(m =>
                       m.Exercise.ResourceReferenceId == er.Id).Id), Guid.NewGuid(), "")));

            //Add course admission to user
            if (user.CourseAdmissions == null)
                user.CourseAdmissions = new List<UserCourseAdmission>();

            user.CourseAdmissions.Add(new UserCourseAdmission
            {
                CourseId = course.Id,
                Results = freshScoreCards.ToList()
            });

            for (int i = 0; i < startingModule; i++)
            {
                var module = modules[i];
                var results = user.CourseAdmissions.Last().Results.Where(r => r.Module.ModuleReferenceId == module.Id);

                foreach (var result in results)
                {
                    result.IsCompleted = true;
                }

            }

            //Remove dialogs for this user
            var dialogRepo = new DialogRepositoryDocumentDb();
            var dialogService = new DialogService(dialogRepo);

            var dialogs = dialogService.GetUserDialogs(user.Id);

            foreach (var dialog in dialogs)
            {
                //Get the opposit dialog
                var oppositeDialog = dialogService.GetOpositDialog(dialog);

                if (dialog.OwnerId == user.CoachId)
                {
                    //Delete all except the first
                    dialog.Entries = new List<UserDialogEntry> { dialog.Entries.OrderBy(d => d.TimeStamp).First() };
                    oppositeDialog.Entries = new List<UserDialogEntry> { oppositeDialog.Entries.OrderBy(d => d.TimeStamp).First() };

                    dialogRepo.SaveDialog(dialog);
                    dialogRepo.SaveDialog(oppositeDialog);
                }
                else
                {
                    dialogRepo.DeleteDialog(dialog);
                    dialogRepo.DeleteDialog(oppositeDialog);
                }
            }
            //Save user
            _userRepository.SaveUser(user);
        }
    }
}
