using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Services;
using BetterWays.Api.BoundedContexts.CoachingCourses.Infrastructure.Repositories;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs.Converters;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Repositories;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace BetterWays.Api.Tests.Courses
{
    [TestClass]
    public class UpdateDoc
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
        public void updateCoursePriorioty ()
        {
            var id = new Guid("e66c7185-a6e2-4026-ae93-3460250e55aa");
            var courseRep = new CoachingCourseRepositoryDocumentDB();
            var moduleGroupeDB = new ModuleGroupRepositoryDocumentDB();

            var course = courseRep.GetCourseById(id);
            var moduleGroups = moduleGroupeDB.GetItemsWithIds(course.ModuleGroups);

            var groups = moduleGroups.Select(CoachingModuleDTOConverter.ConvertToDTO).ToList();

            var moduleGroup = moduleGroupeDB.GetAllItems();
            foreach (var group in moduleGroups)
            {
                switch (group.GroupName)
                {
                    case "Læg en plan og hold den":
                        group.GroupPriority = 0;
                        moduleGroupeDB.SaveItem(group);
                        break;
                    case "Dit talent og din profil":
                        group.GroupPriority = 1;
                        moduleGroupeDB.SaveItem(group);
                        break;
                    case "Gør dig synlig":
                        group.GroupPriority = 2;
                        moduleGroupeDB.SaveItem(group);
                        break;
                    case "Nå dit mål":
                        group.GroupPriority = 3;
                        moduleGroupeDB.SaveItem(group);
                        break;
                }
            }
            var newModuleGroup = moduleGroupeDB.GetAllItems();
            var antal = newModuleGroup.Count();
            Assert.AreEqual(antal, 4);
        }
        [TestMethod]
        public void updateUser()
        {
            var id = new Guid("710ad145-bbd6-47b5-bc6d-1f5d1cfa7bed");
            var userRepo = new UserRepositoryDocumentDB();
            var user = userRepo.GetUserById(id);
            user.UserId = "coach10";
            userRepo.SaveUser(user);

            var getAllUser = userRepo.GetAllItems();
            var antal = getAllUser.Count();
            Assert.AreEqual(antal, 51);
        }


        //ændre simons bruger, til mit eget login
        [TestMethod]
        public void updateSto()
        {
            var id = new Guid("06d535e2-2e2f-4240-8f40-f3c536b4fa58");
            var userRepo = new UserRepositoryDocumentDB();
            var user = userRepo.GetUserById(id);
            user.UserId = "hsm";
            user.FirstName = "Henrik";
            user.LastName = "Smith";

            userRepo.SaveUser(user);

            var getAllUser = userRepo.GetAllItems();
            var antal = getAllUser.Count();
            Assert.AreEqual(antal, 51);
        }

        //[TestMethod]
        //public void addNewExercise()
        //{
        //    var moduleId = new Guid("474b42a9-dea7-4ce6-a815-591c96015a09");
        //    var exerciseId = new Guid();
        //    var exerciseRepo = new CoachnigModuleExerciseResourceRepositoryDocumentDB();
            
        //    var moduleRepo = new CoachingModuleRepositoryDocumentDB();
        //    var modul = moduleRepo.GetModuleById(moduleId);
            

        //    var something = "hej";
        //    //var module = moduleRepo.

        //}

    }
}