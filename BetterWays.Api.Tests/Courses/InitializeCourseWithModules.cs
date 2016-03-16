using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Repositories;
using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Services;
using BetterWays.Api.BoundedContexts.CoachingCourses.Infrastructure.Repositories;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BetterWays.Api.Tests.Courses
{
    [TestClass]
    public class InitializeCourseWithModules
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

            _coachingCourseService = new CoachingCourseService(
                new CoachingCourseRepositoryDocumentDB(),
                new ModuleResourceRepositoryDocumentDb(),
                new CoachingModuleRepositoryDocumentDB(),
                new CoachnigModuleExerciseResourceRepositoryDocumentDB());
        }

        [TestMethod]
        public void InitCourseWithModules()
        {
            var courseName = "Better ways course";
            //Create the course
            var course = _coachingCourseService.CreateNewCoachingCourse(courseName);

            _coachingCourseService.CreateNewModuleInCourse(course, "Fyret. Hvad nu?");
            _coachingCourseService.CreateNewModuleInCourse(course, "Læg en plan og hold den");
            _coachingCourseService.CreateNewModuleInCourse(course, "Siccesshistorier");
            _coachingCourseService.CreateNewModuleInCourse(course, "Dit talent");
            _coachingCourseService.CreateNewModuleInCourse(course, "Dine personlige kompetencer");
            _coachingCourseService.CreateNewModuleInCourse(course, "Motivation");

            _coachingCourseService.CreateNewModuleInCourse(course, "Linkedin profil");
            _coachingCourseService.CreateNewModuleInCourse(course, "Mulighederne - dig og din nye arbejdsplads");
            _coachingCourseService.CreateNewModuleInCourse(course, "Netværk og social kapital");
            _coachingCourseService.CreateNewModuleInCourse(course, "Nettet");
            _coachingCourseService.CreateNewModuleInCourse(course, "Massiv indsats - hit med jobbet");
            _coachingCourseService.CreateNewModuleInCourse(course, "Jobtilbud / jobafslag");


        }
    }
}
