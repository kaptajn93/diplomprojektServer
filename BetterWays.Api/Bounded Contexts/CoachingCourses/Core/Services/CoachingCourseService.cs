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

        public CoachingCourseService(
            ICoachingCourseRepository coachingCourserepository, 
            IModuleResourceRepository resourceRpository,
            ICoachingModuleRepository moduleRepository)
        {
            _coachingCourseRepository = coachingCourserepository;
            _resourceRepository = resourceRpository;
            _moduleRepository = moduleRepository;
        }

        public CoachingCourse CreateNewCoachingCourse(string courseName)
        {
            var course = new CoachingCourse(courseName);
            _coachingCourseRepository.CreateCoachingCourse(course);

            return course;
        }

        public CoachingModule CreateNewModuleInCourse(CoachingCourse coachingCourse, string moduleName)
        {
            //Create resources with default content
            //TODO: Load the default content from somewhere
            var introduction = new CoachingModuleResource() { Content = "<h1>&lt;Overskrift her&gt;</h1> <p>&lt;Kort tekst her&gt;</p> <div data-oembed-url='https://vimeo.com/ricardonilsson/coachingwill'> <div style='left: 0px; width: 100%; height: 0px; position: relative; padding-bottom: 56.2493%;'><iframe allowfullscreen='true' frameborder='0' mozallowfullscreen='true' src='//player.vimeo.com/video/77308630?byline=0&amp;badge=0&amp;portrait=0&amp;title=0' style='top: 0px; left: 0px; width: 100%; height: 100%; position: absolute;' webkitallowfullscreen='true'></iframe></div> </div> <h2>&lt;Overskrift, start p&aring; udvidet intro&gt;</h2> <p>&lt;Intro her&gt;</p> <h2>&lt;Overskrift, eksterne henvisninger&gt;</h2> <p><a href='http://wikipedia.org'>&lt;Eksempel p&aring; link&gt;</a></p>" };
            var exercise = new CoachingModuleResource() { Content = "<h1>&lt;Overskrift her&gt;</h1>  <p>&lt;Kort tekst her&gt;</p>  <h2>&nbsp;</h2>" };
            var reflection = new CoachingModuleResource() { Content = "<h1>&lt;Overskrift her&gt;</h1>  <p>&lt;Kort tekst her&gt;</p>  <h2>&nbsp;</h2>" };


            //Create revsions for new content
            var introRevision = Guid.NewGuid();
            PushResourceVersion(introduction, introRevision, _resourceRepository);
            var exerciseRevision = Guid.NewGuid();
            PushResourceVersion(exercise, exerciseRevision, _resourceRepository);
            var reflectionRevision = Guid.NewGuid();
            PushResourceVersion(reflection, reflectionRevision, _resourceRepository);

            //Save resources
            _resourceRepository.CreateModuleResource(introduction);
            _resourceRepository.CreateModuleResource(exercise);
            _resourceRepository.CreateModuleResource(reflection);

            /*_revisonHistoryRepository.CreateRevisionHistory(introRevision);
            _revisonHistoryRepository.CreateRevisionHistory(exerciseRevision);
            _revisonHistoryRepository.CreateRevisionHistory(reflectionRevision);*/

            //Create and add module
            var module =new CoachingModule(
                moduleName,
                introduction, exercise, reflection);

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
        private void PushResourceVersion(CoachingModuleResource newVersion, Guid revisionId, IModuleResourceRepository resourseRepos)
        {
            var last = resourseRepos.GetItems(i => i.RevisionHistory.ReferenceId == revisionId).OrderBy(i => i.Version).LastOrDefault();

            if (last != null)
                newVersion.Version = last.Version + 1;
            else
                newVersion.Version = 1;

            newVersion.RevisionHistory = new ResourseRevisionHistoryReference() { ReferenceId = revisionId };
        }
        
        public CoachingModuleResource UpdateModuleResurce(CoachingModule module, CoachingModuleResourceReference resource, string newContent)
        {
            //Create the new version
            var newResource = new CoachingModuleResource() { Content = newContent };
            PushResourceVersion(newResource, resource.RevisionHistoryReferenceId, _resourceRepository);

            //Update the module revision
            if (module.Introduction.RevisionHistoryReferenceId == resource.RevisionHistoryReferenceId)
                module.Introduction = new CoachingModuleResourceReference(newResource.Id, newResource.RevisionHistory.ReferenceId);
            else if (module.Exercise.RevisionHistoryReferenceId == resource.RevisionHistoryReferenceId)
                module.Exercise = new CoachingModuleResourceReference(newResource.Id, newResource.RevisionHistory.ReferenceId);
            else if (module.Reflection.RevisionHistoryReferenceId == resource.RevisionHistoryReferenceId)
                module.Reflection = new CoachingModuleResourceReference(newResource.Id, newResource.RevisionHistory.ReferenceId);

            //Save
            _moduleRepository.SaveModule(module);
            _resourceRepository.CreateModuleResource(newResource);
            
            return newResource;
        }
    }
}
