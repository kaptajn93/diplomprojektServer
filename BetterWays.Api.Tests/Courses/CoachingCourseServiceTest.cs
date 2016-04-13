using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents;
using System.Configuration;
using System.Linq;
using Microsoft.Azure.Documents.Linq;
using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Services;
using BetterWays.Api.BoundedContexts.CoachingCourses.Infrastructure.Repositories;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Repositories;
using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Models;

namespace Tests
{
    [TestClass]
    public class CoachingCourseServiceTest
    {
        private static DocumentClient _client;
        private static Database _database;
        private static CoachingCourseService _coachingCourseService;

        [ClassInitialize()]
        public static void ClassInit(TestContext context)
        {
            //Connect do documentdb account
            var endpoint = ConfigurationManager.AppSettings["endpoint"];
            var masterKey = ConfigurationManager.AppSettings["authKey"];
            var dbName = ConfigurationManager.AppSettings["database"];

            _client = new DocumentClient(new Uri(endpoint), masterKey);
            
            //Check if database has been created
            var databases = _client.CreateDatabaseQuery().Where(d => d.Id == dbName).ToList();

            //Delete any
            /*if (databases.Any())
            {
                foreach (var database in databases)
                {
                    _client.DeleteDatabaseAsync(database.SelfLink);
                }
            }*/

            _coachingCourseService = new CoachingCourseService(
                new CoachingCourseRepositoryDocumentDB(), 
                new ModuleResourceRepositoryDocumentDb(), 
                new CoachingModuleRepositoryDocumentDB(),
                new CoachnigModuleExerciseResourceRepositoryDocumentDB(),
                new UserRepositoryDocumentDB());
        }

        [TestMethod]
        public void CreateCoachingCourse()
        {
            var courseName = "Service test course";
            //Create the course
            _coachingCourseService.CreateNewCoachingCourse(courseName);

            //Check if we can find it, via another repository
            var repo = new CoachingCourseRepositoryDocumentDB();
            var foundCourse = repo.GetItems(c => c.Name == courseName).Single();

            Assert.IsNotNull(foundCourse);
        }

        [TestMethod]
        public void AddModuleViaService()
        {
            var courseName = "Service test course with modules";
            //Create the course
            var course = _coachingCourseService.CreateNewCoachingCourse(courseName);
            _coachingCourseService.CreateNewModuleInCourse(course, "Some module", 0);

            //Check that revisions histories was created
            var resourceRepo = new ModuleResourceRepositoryDocumentDb();
            var exerciseRepo = new CoachnigModuleExerciseResourceRepositoryDocumentDB();
            var moduleRepo = new CoachingModuleRepositoryDocumentDB();
            var foundModule = moduleRepo.GetModuleById(course.Modules[0].ModuleReferenceId);
            
            //Check that repos only has one version
            Assert.AreEqual(resourceRepo.GetItems(i => i.RevisionHistory.ReferenceId == foundModule.Introduction.RevisionHistoryReferenceId).Count(), 1);
            Assert.AreEqual(exerciseRepo.GetItems(i => i.RevisionHistory.ReferenceId == foundModule.Exercise.RevisionHistoryReferenceId).Count(), 1);
            Assert.AreEqual(exerciseRepo.GetItems(i => i.RevisionHistory.ReferenceId == foundModule.Reflection.RevisionHistoryReferenceId).Count(), 1);

            Assert.AreNotEqual(foundModule.Introduction.RevisionHistoryReferenceId, foundModule.Exercise.RevisionHistoryReferenceId);
            Assert.AreNotEqual(foundModule.Introduction.RevisionHistoryReferenceId, foundModule.Reflection.RevisionHistoryReferenceId);
            Assert.AreNotEqual(foundModule.Exercise.RevisionHistoryReferenceId, foundModule.Reflection.RevisionHistoryReferenceId);
        }

        [TestMethod]
        public void UpdateModuleResource()
        {
            var courseName = "Service test course with updated module";
            //Create the course
            var course = _coachingCourseService.CreateNewCoachingCourse(courseName);
            var coachingModule = _coachingCourseService.CreateNewModuleInCourse(course, "Some module", 0);

            var newResource = new CoachingModuleResource()
            {
                Content = "En meget kortere tekst",
                RevisionHistory = new ResourseRevisionHistoryReference() { ReferenceId = coachingModule.Introduction.RevisionHistoryReferenceId }
            };

            _coachingCourseService.UpdateModuleResurce(coachingModule, newResource);

            var courseRepo = new CoachingCourseRepositoryDocumentDB();
            var resourceRepo = new ModuleResourceRepositoryDocumentDb();
            var moduleRepo = new CoachingModuleRepositoryDocumentDB();
            var foundCourse = courseRepo.GetItems(i => i.Id == course.Id).Single();
            var foundModule = moduleRepo.GetModuleById(foundCourse.Modules[0].ModuleReferenceId);
            var foundIntroductionResource = resourceRepo.GetResourceById(foundModule.Introduction.ResourceReferenceId);

            Assert.AreEqual(foundCourse.Modules.Count, 1);
            Assert.AreEqual(foundIntroductionResource.Content, "En meget kortere tekst");
            
            resourceRepo = new ModuleResourceRepositoryDocumentDb();
            var foundResources = resourceRepo.GetItems(i => i.RevisionHistory.ReferenceId == foundModule.Introduction.RevisionHistoryReferenceId);
            
            Assert.AreEqual(foundResources.OrderBy(v => v.Version).ToList()[0].Version, 1);
            Assert.AreEqual(foundResources.OrderBy(v => v.Version).ToList()[1].Version, 2);
            
            Assert.AreNotEqual(foundResources.OrderBy(v => v.Version).ToList()[0].Content, "En meget kortere tekst");
            Assert.AreEqual(foundResources.OrderBy(v => v.Version).ToList()[1].Content, "En meget kortere tekst");
        }
    }
}
