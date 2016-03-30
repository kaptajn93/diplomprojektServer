using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents;
using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Services;
using System.Configuration;
using Microsoft.Azure.Documents.Linq;
using System.Linq;
using BetterWays.Api.BoundedContexts.CoachingCourses.Infrastructure.Repositories;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Repositories;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.User;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models;
using System.Collections.Generic;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises;
using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Models;

namespace BetterWays.Api.Tests.Courses
{
    [TestClass]
    public class UserTests
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
            /*var databases = _client.CreateDatabaseQuery().Where(d => d.Id == dbName).ToList();

            //Delete any
            if (databases.Any())
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
        public void CreateUser()
        {
            var usr = new Bounded_Contexts.CoachingCourses.Core.Models.User.User()
            {
               FirstName = "Jørgen",
               LastName = "Jensen",
               Password = "1234" 
            };

            var userRepo = new UserRepositoryDocumentDB();
            userRepo.CreateUser(usr);

            var foundUsr = userRepo.GetUserById(usr.Id);

            Assert.IsNotNull(foundUsr);
            Assert.AreEqual(foundUsr.FirstName, usr.FirstName);
            Assert.AreEqual(foundUsr.LastName, usr.LastName);
            Assert.AreEqual(foundUsr.Password, usr.Password);
        }

        [TestMethod]
        public void AdmitUsertoCourse()
        {
            var courseRepo = new CoachingCourseRepositoryDocumentDB();
            var usr = new Bounded_Contexts.CoachingCourses.Core.Models.User.User()
            {
                FirstName = "Jørgen",
                LastName = "Jensen",
                Password = "1234"
            };

            var userRepo = new UserRepositoryDocumentDB();
            userRepo.CreateUser(usr);

            var foundUsr = userRepo.GetUserById(usr.Id);

            var coachingCourseService = new CoachingCourseService(
                courseRepo,
                new ModuleResourceRepositoryDocumentDb(),
                new CoachingModuleRepositoryDocumentDB(),
                new CoachnigModuleExerciseResourceRepositoryDocumentDB(),
                new UserRepositoryDocumentDB());


            var courseName = "Better ways course";
            //Create the course

            var course = courseRepo.GetItems(i => i.Name == courseName).Last(); // _coachingCourseService.CreateNewCoachingCourse(courseName);
            
            coachingCourseService.AdmitUserToCourse(foundUsr, course);

        }

        [TestMethod]
        public void UserControllerTest()
        {

        }
    }
}
