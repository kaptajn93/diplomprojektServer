using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents;
using System.Configuration;
using System.Linq;
using Microsoft.Azure.Documents.Linq;
using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Services;
using BetterWays.Api.BoundedContexts.CoachingCourses.Infrastructure.Repositories;

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

            _coachingCourseService = new CoachingCourseService(new CoachingCourseRepositoryDocumentDB(), new CoachingModuleResourceRevisionHistoryRepositoryDocumentDB(), new CoachingModuleResourceRepositoryDocumentDb());

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
            _coachingCourseService.CreateNewModuleInCourse(course, "Some module");

            //Check that revisions histories was created
            var revRepo = new CoachingModuleResourceRevisionHistoryRepositoryDocumentDB();
            var resourceRepo = new CoachingModuleResourceRepositoryDocumentDb();
            
            var allRepositories = revRepo.GetAllItems().ToList();
            Assert.AreEqual(allRepositories.Count, 3);

            //Check that repos only has one version
            Assert.AreEqual(resourceRepo.GetItems(i => i.RevisionHistory.ReferenceId == allRepositories[0].Id).Count(), 1);
            Assert.AreEqual(resourceRepo.GetItems(i => i.RevisionHistory.ReferenceId == allRepositories[1].Id).Count(), 1);
            Assert.AreEqual(resourceRepo.GetItems(i => i.RevisionHistory.ReferenceId == allRepositories[2].Id).Count(), 1);
        }

        [TestMethod]
        public void UpdateModuleResource()
        {
            var courseName = "Service test course with updated module";
            //Create the course
            var course = _coachingCourseService.CreateNewCoachingCourse(courseName);
            var coachingModule = _coachingCourseService.CreateNewModuleInCourse(course, "Some module");
            
            _coachingCourseService.UpdateModuleResurce(course, course.Modules[0], coachingModule.Introduction, "En meget kortere tekst");

            var courseRepo = new CoachingCourseRepositoryDocumentDB();
            var resourceRepo = new CoachingModuleResourceRepositoryDocumentDb();
            var foundCourse = courseRepo.GetItems(i => i.Id == course.Id).Single();
            var foundIntroductionResource = resourceRepo.GetResourceById(foundCourse.Modules[0].Introduction.ResourceReferenceId);

            Assert.AreEqual(foundCourse.Modules.Count, 1);
            Assert.AreEqual(foundIntroductionResource.Content, "En meget kortere tekst");

            var revisionRepo = new CoachingModuleResourceRevisionHistoryRepositoryDocumentDB();
            resourceRepo = new CoachingModuleResourceRepositoryDocumentDb();
            var foundRevison = revisionRepo.GetRevisionHistoryById(course.Modules[0].Introduction.RevisionHistoryReferenceId);
            var foundResources = resourceRepo.GetItems(i => i.RevisionHistory.ReferenceId == course.Modules[0].Introduction.RevisionHistoryReferenceId);

            Assert.IsNotNull(foundRevison);
            Assert.AreEqual(foundResources.OrderBy(v => v.Version).ToList()[0].Version, 1);
            Assert.AreEqual(foundResources.OrderBy(v => v.Version).ToList()[1].Version, 2);
            
            Assert.AreNotEqual(foundResources.OrderBy(v => v.Version).ToList()[0].Content, "En meget kortere tekst");
            Assert.AreEqual(foundResources.OrderBy(v => v.Version).ToList()[1].Content, "En meget kortere tekst");
        }
    }
}
