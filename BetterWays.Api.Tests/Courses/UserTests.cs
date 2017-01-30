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
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Services;

namespace BetterWays.Api.Tests.Courses
{
    [TestClass]
    public class UserTests
    {
        private static DocumentClient _client;
        private static Database _database;
        private static UserService _userService;
        private static Guid _testUserId;
        
        [ClassInitialize()]
        public static void ClassInit(TestContext context)
        {
            //Connect do documentdb account
            var endpoint = ConfigurationManager.AppSettings["endpoint"];
            var masterKey = ConfigurationManager.AppSettings["authKey"];
            var dbName = ConfigurationManager.AppSettings["database"];

            _client = new DocumentClient(new Uri(endpoint), masterKey);

            _userService = new UserService(
                new UserRepositoryDocumentDB(), new DialogRepositoryDocumentDb());
        }

        [TestMethod]
        public void CreateUser()
        {
            var usr = _userService.CreateUser(
                "hsm@miracle.dk", 
                "Henrik", 
                "Smith", 
                "1234",
                "hsm@miracle.dk", 
                new List<string>() { "Demo" }, 
                new Guid()
                );
            _testUserId = usr.Id;
            
            var foundUsr = new UserRepositoryDocumentDB().GetUserById(usr.Id);

            Assert.IsNotNull(foundUsr);
            Assert.AreEqual(foundUsr.FirstName, usr.FirstName);
            Assert.AreEqual(foundUsr.LastName, usr.LastName);
            Assert.AreEqual(foundUsr.Password, usr.Password);
        }

        [TestMethod]
        public void CreateAdminUser()
        {
            var usr = new Bounded_Contexts.CoachingCourses.Core.Models.User.User()
            {
                UserId = "admin",
                FirstName = "Indholds",
                LastName = "Administrator",
                Password = "1234",
                Roles = new List<string>() { "Admin" }
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
        public void CreateCoachUser()
        {
            var usr = new Bounded_Contexts.CoachingCourses.Core.Models.User.User()
            {
                UserId = "coach1",
                FirstName = "Tine",
                LastName = "Meisner",
                Password = "1234",
                Roles = new List<string>() { "Coach" }
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
            
            var userRepo = new UserRepositoryDocumentDB();

            var foundUsr = userRepo.GetUserById(new Guid("e65bed30-1e7e-4920-9ee4-b880fe9034e5"));

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
