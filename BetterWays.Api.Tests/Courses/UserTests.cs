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
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Controllers;

namespace BetterWays.Api.Tests.Courses
{
    [TestClass]
    public class UserTests
    {
        private static DocumentClient _client;
        private static Database _database;
        private static CoachingCourseService _coachingCourseService;
        private static Guid _testUserId;

        [ClassInitialize()]
        public static void ClassInit(TestContext context)
        {
            //Connect do documentdb account
            var endpoint = ConfigurationManager.AppSettings["endpoint"];
            var masterKey = ConfigurationManager.AppSettings["authKey"];
            var dbName = ConfigurationManager.AppSettings["database"];

            _client = new DocumentClient(new Uri(endpoint), masterKey);
            
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
            _testUserId = usr.Id;

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
            
            var userRepo = new UserRepositoryDocumentDB();

            var foundUsr = userRepo.GetUserById(_testUserId);

            var coachingCourseService = new CoachingCourseService(
                courseRepo,
                new ModuleResourceRepositoryDocumentDb(),
                new CoachingModuleRepositoryDocumentDB(),
                new CoachnigModuleExerciseResourceRepositoryDocumentDB(),
                new UserRepositoryDocumentDB());


            var courseName = "Better ways course";

            //Get course
            var course = courseRepo.GetItems(i => i.Name == courseName).Last(); // _coachingCourseService.CreateNewCoachingCourse(courseName);
            
            coachingCourseService.AdmitUserToCourse(foundUsr, course);
        }

        [TestMethod]
        public void UserControllerTest()
        {
            var usrController = new UserController();

            var usrDto = usrController.Get(_testUserId);

            Assert.IsNotNull(usrDto);
            Assert.AreEqual(usrDto.FirstName, "Jørgen");
            Assert.AreEqual(usrDto.LastName, "Jensen");
            Assert.IsTrue(
                    usrDto.CourseAdmissions.All(ca => ca != null && ca.Results.All(r => r != null && !r.IsCompleted && r.ModuleId != null))
                );
        }
    }
}
