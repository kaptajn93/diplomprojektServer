using System;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using Newtonsoft.Json;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Configuration;
using System.Linq;
using BetterWays.Api.BoundedContexts.CoachingCourses.Infrastructure.Repositories;
using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Models;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models;
using System.Collections.Generic;

namespace Tests
{
    [TestClass]
    public class CoachingCourseRepoTest
    {
        private static DocumentClient _client;
        private static Database _database;

        [ClassInitialize()]
        public static void ClassInit(TestContext context)
        {
            //Connect do documentdb account
            var endpoint = ConfigurationManager.AppSettings["endpoint"];
            var masterKey = ConfigurationManager.AppSettings["authKey"];
            var dbName = ConfigurationManager.AppSettings["database"];

            _client = new DocumentClient(new Uri(endpoint), masterKey);

            /*------ Get a fresh database --------*/
            
            //Check if database has been created
            var databases = _client.CreateDatabaseQuery().Where(d => d.Id == dbName).ToList();

            //Delete any
            if (databases.Any())
            {
                foreach (var database in databases)
                {
                    _client.DeleteDatabaseAsync(database.SelfLink);
                }
            }
        }
        
        [TestMethod]
        public void CreateAndFindNewCourse()
        {
            var courseName = "Test coaching course";
            var courseRepo = new CoachingCourseRepositoryDocumentDB();
            var course = new CoachingCourse(courseName);
            courseRepo.CreateCoachingCourse(course);

            courseRepo.SaveCoachingCourse(course);

            courseRepo = new CoachingCourseRepositoryDocumentDB();
            var foundCourses = courseRepo.GetItems(c => c.Name == courseName).Single();
            
            Assert.IsNotNull(foundCourses);
        }

        [TestMethod]
        public void AddModuleToCourse()
        {
            var courseName = "Course with modules";
            var courseRepo = new CoachingCourseRepositoryDocumentDB();
            var course = new CoachingCourse(courseName);
            courseRepo.CreateCoachingCourse(course);
            
            var introduction = new CoachingModuleResource() { RevisionHistory = new ResourseRevisionHistoryReference(), Content = "<h1>&lt;Overskrift her&gt;</h1> <p>&lt;Kort tekst her&gt;</p> <div data-oembed-url='https://vimeo.com/ricardonilsson/coachingwill'> <div style='left: 0px; width: 100%; height: 0px; position: relative; padding-bottom: 56.2493%;'><iframe allowfullscreen='true' frameborder='0' mozallowfullscreen='true' src='//player.vimeo.com/video/77308630?byline=0&amp;badge=0&amp;portrait=0&amp;title=0' style='top: 0px; left: 0px; width: 100%; height: 100%; position: absolute;' webkitallowfullscreen='true'></iframe></div> </div> <h2>&lt;Overskrift, start p&aring; udvidet intro&gt;</h2> <p>&lt;Intro her&gt;</p> <h2>&lt;Overskrift, eksterne henvisninger&gt;</h2> <p><a href='http://wikipedia.org'>&lt;Eksempel p&aring; link&gt;</a></p>" };
            var exercise = new CoachingModuleExerciseResource() { RevisionHistory = new ResourseRevisionHistoryReference(), Elements = new List<ResourceExerciseElement>() { new ResourceExerciseElement("<h1>&lt;Overskrift her&gt;</h1>  <p>&lt;Kort tekst her, efterfulgt af &gt;</p>  <SortableList/>") } };
            var reflection = new CoachingModuleExerciseResource() { RevisionHistory = new ResourseRevisionHistoryReference(), Elements = new List<ResourceExerciseElement>() { new ResourceExerciseElement("<h1>&lt;Overskrift her&gt;</h1>  <p>&lt;Kort tekst her&gt;</p>  <h2>&nbsp;</h2>") } };

            var module = new CoachingModule
            (
                "My coaching module",
                introduction,
                exercise,
                reflection
            );

            course.AddCoachingModule(module);
            courseRepo.SaveCoachingCourse(course);

            courseRepo = new CoachingCourseRepositoryDocumentDB();
            var foundCourses = courseRepo.GetItems(c => c.Name == courseName).Single();

            Assert.IsNotNull(foundCourses);
        }

        [TestMethod]
        public void UpdateModuleName()
        {
            var courseName = "Course with modules";
            var courseRepo = new CoachingCourseRepositoryDocumentDB();
            var moduleRepo = new CoachingModuleRepositoryDocumentDB();
            var course = new CoachingCourse(courseName);
            courseRepo.CreateCoachingCourse(course);

            var introduction = new CoachingModuleResource() { RevisionHistory = new ResourseRevisionHistoryReference(), Content = "<h1>&lt;Overskrift her&gt;</h1> <p>&lt;Kort tekst her&gt;</p> <div data-oembed-url='https://vimeo.com/ricardonilsson/coachingwill'> <div style='left: 0px; width: 100%; height: 0px; position: relative; padding-bottom: 56.2493%;'><iframe allowfullscreen='true' frameborder='0' mozallowfullscreen='true' src='//player.vimeo.com/video/77308630?byline=0&amp;badge=0&amp;portrait=0&amp;title=0' style='top: 0px; left: 0px; width: 100%; height: 100%; position: absolute;' webkitallowfullscreen='true'></iframe></div> </div> <h2>&lt;Overskrift, start p&aring; udvidet intro&gt;</h2> <p>&lt;Intro her&gt;</p> <h2>&lt;Overskrift, eksterne henvisninger&gt;</h2> <p><a href='http://wikipedia.org'>&lt;Eksempel p&aring; link&gt;</a></p>" };
            var exercise = new CoachingModuleExerciseResource() { RevisionHistory = new ResourseRevisionHistoryReference(), Elements = new List<ResourceExerciseElement>() { new ResourceExerciseElement("<h1>&lt;Overskrift her&gt;</h1>  <p>&lt;Kort tekst her, efterfulgt af &gt;</p>  <SortableList/>") } };
            var reflection = new CoachingModuleExerciseResource() { RevisionHistory = new ResourseRevisionHistoryReference(), Elements = new List<ResourceExerciseElement>() { new ResourceExerciseElement("<h1>&lt;Overskrift her&gt;</h1>  <p>&lt;Kort tekst her&gt;</p>  <h2>&nbsp;</h2>") } };

            var module = new CoachingModule
            (
                "Some module, that is gonna have its name changed",
                introduction,
                exercise,
                reflection
            );

            course.AddCoachingModule(module);
            moduleRepo.CreateModule(module);
            courseRepo.SaveCoachingCourse(course);

            moduleRepo = new CoachingModuleRepositoryDocumentDB();
            var foundModule = moduleRepo.GetItems(m => m.Id == module.Id).Single();

            Assert.IsNotNull(foundModule);

            module.Name = "Some module with a new name";
            moduleRepo.SaveModule(module);
            
            moduleRepo = new CoachingModuleRepositoryDocumentDB();
            var newFoundModule = moduleRepo.GetItems(m => m.Id == module.Id).Single();

            Assert.AreEqual(newFoundModule.Name, "Some module with a new name");
        }

        [TestMethod]
        public void GetMultipleModulesWithSpecificIds()
        {
            var courseName = "Course with multiple modules";
            var courseRepo = new CoachingCourseRepositoryDocumentDB();
            var moduleRepo = new CoachingModuleRepositoryDocumentDB();
            var course = new CoachingCourse(courseName);
            courseRepo.CreateCoachingCourse(course);

            var introduction1 = new CoachingModuleResource() { RevisionHistory = new ResourseRevisionHistoryReference(), Content = "<h1>&lt;Overskrift her&gt;</h1> <p>&lt;Kort tekst her&gt;</p> <div data-oembed-url='https://vimeo.com/ricardonilsson/coachingwill'> <div style='left: 0px; width: 100%; height: 0px; position: relative; padding-bottom: 56.2493%;'><iframe allowfullscreen='true' frameborder='0' mozallowfullscreen='true' src='//player.vimeo.com/video/77308630?byline=0&amp;badge=0&amp;portrait=0&amp;title=0' style='top: 0px; left: 0px; width: 100%; height: 100%; position: absolute;' webkitallowfullscreen='true'></iframe></div> </div> <h2>&lt;Overskrift, start p&aring; udvidet intro&gt;</h2> <p>&lt;Intro her&gt;</p> <h2>&lt;Overskrift, eksterne henvisninger&gt;</h2> <p><a href='http://wikipedia.org'>&lt;Eksempel p&aring; link&gt;</a></p>" };
            var exercise1 = new CoachingModuleExerciseResource() { RevisionHistory = new ResourseRevisionHistoryReference(), Elements = new List<ResourceExerciseElement>() { new ResourceExerciseElement("<h1>&lt;Overskrift her&gt;</h1>  <p>&lt;Kort tekst her, efterfulgt af &gt;</p>  <SortableList/>") } };
            var reflection1 = new CoachingModuleExerciseResource() { RevisionHistory = new ResourseRevisionHistoryReference(), Elements = new List<ResourceExerciseElement>() { new ResourceExerciseElement("<h1>&lt;Overskrift her&gt;</h1>  <p>&lt;Kort tekst her&gt;</p>  <h2>&nbsp;</h2>") } };

            var module1 = new CoachingModule
            (
                "My coaching module 1",
                introduction1,
                exercise1,
                reflection1
            );

            var introduction2 = new CoachingModuleResource() { RevisionHistory = new ResourseRevisionHistoryReference(), Content = "<h1>&lt;Overskrift her&gt;</h1> <p>&lt;Kort tekst her&gt;</p> <div data-oembed-url='https://vimeo.com/ricardonilsson/coachingwill'> <div style='left: 0px; width: 100%; height: 0px; position: relative; padding-bottom: 56.2493%;'><iframe allowfullscreen='true' frameborder='0' mozallowfullscreen='true' src='//player.vimeo.com/video/77308630?byline=0&amp;badge=0&amp;portrait=0&amp;title=0' style='top: 0px; left: 0px; width: 100%; height: 100%; position: absolute;' webkitallowfullscreen='true'></iframe></div> </div> <h2>&lt;Overskrift, start p&aring; udvidet intro&gt;</h2> <p>&lt;Intro her&gt;</p> <h2>&lt;Overskrift, eksterne henvisninger&gt;</h2> <p><a href='http://wikipedia.org'>&lt;Eksempel p&aring; link&gt;</a></p>" };
            var exercise2 = new CoachingModuleExerciseResource() { RevisionHistory = new ResourseRevisionHistoryReference(), Elements = new List<ResourceExerciseElement>() { new ResourceExerciseElement("<h1>&lt;Overskrift her&gt;</h1>  <p>&lt;Kort tekst her, efterfulgt af &gt;</p>  <SortableList/>") } };
            var reflection2 = new CoachingModuleExerciseResource() { RevisionHistory = new ResourseRevisionHistoryReference(), Elements = new List<ResourceExerciseElement>() { new ResourceExerciseElement("<h1>&lt;Overskrift her&gt;</h1>  <p>&lt;Kort tekst her&gt;</p>  <h2>&nbsp;</h2>") } };

            var module2 = new CoachingModule
            (
                "My coaching module 2",
                introduction2,
                exercise2,
                reflection2
            );

            var introduction3 = new CoachingModuleResource() { RevisionHistory = new ResourseRevisionHistoryReference(), Content = "<h1>&lt;Overskrift her&gt;</h1> <p>&lt;Kort tekst her&gt;</p> <div data-oembed-url='https://vimeo.com/ricardonilsson/coachingwill'> <div style='left: 0px; width: 100%; height: 0px; position: relative; padding-bottom: 56.2493%;'><iframe allowfullscreen='true' frameborder='0' mozallowfullscreen='true' src='//player.vimeo.com/video/77308630?byline=0&amp;badge=0&amp;portrait=0&amp;title=0' style='top: 0px; left: 0px; width: 100%; height: 100%; position: absolute;' webkitallowfullscreen='true'></iframe></div> </div> <h2>&lt;Overskrift, start p&aring; udvidet intro&gt;</h2> <p>&lt;Intro her&gt;</p> <h2>&lt;Overskrift, eksterne henvisninger&gt;</h2> <p><a href='http://wikipedia.org'>&lt;Eksempel p&aring; link&gt;</a></p>" };
            var exercise3 = new CoachingModuleExerciseResource() { RevisionHistory = new ResourseRevisionHistoryReference(), Elements = new List<ResourceExerciseElement>() { new ResourceExerciseElement("<h1>&lt;Overskrift her&gt;</h1>  <p>&lt;Kort tekst her, efterfulgt af &gt;</p>  <SortableList/>") } };
            var reflection3 = new CoachingModuleExerciseResource() { RevisionHistory = new ResourseRevisionHistoryReference(), Elements = new List<ResourceExerciseElement>() { new ResourceExerciseElement("<h1>&lt;Overskrift her&gt;</h1>  <p>&lt;Kort tekst her&gt;</p>  <h2>&nbsp;</h2>") } };

            var module3 = new CoachingModule
            (
                "My coaching module 2",
                introduction3,
                exercise3,
                reflection3
            );
            
            course.AddCoachingModule(module1);
            course.AddCoachingModule(module2);
            course.AddCoachingModule(module3);
            courseRepo.SaveCoachingCourse(course);

            moduleRepo.SaveModule(module1);
            moduleRepo.SaveModule(module2);
            moduleRepo.SaveModule(module3);

            courseRepo = new CoachingCourseRepositoryDocumentDB();
            moduleRepo = new CoachingModuleRepositoryDocumentDB();
            var foundCourses = courseRepo.GetItems(c => c.Name == courseName).Single();

            var foundModules = moduleRepo.GetItemsWithIds(foundCourses.Modules.Select(m => m.ModuleReferenceId)).ToList();

            Assert.AreEqual(foundModules.Count(), 3);

            Assert.IsNotNull(foundCourses);
        }
    }
}
