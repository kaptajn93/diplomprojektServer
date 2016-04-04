using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Repositories;
using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Models;
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
                new CoachnigModuleExerciseResourceRepositoryDocumentDB(),
                new UserRepositoryDocumentDB());
        }

        [TestMethod]
        public void InitCourseWithModules()
        {
            var moduleRepo = new CoachingModuleRepositoryDocumentDB();
            var courseName = "Better ways course";
            //Create the course
            var course = _coachingCourseService.CreateNewCoachingCourse(courseName);

            var mod1 = _coachingCourseService.CreateNewModuleInCourse(course, "Fyret. Hvad nu?");
            Assert.IsNotNull(mod1.Exercise);

            mod1.Description = "Find det positive i dit seneste job, og undgå negativiteten. Se fremad, mod nye udfordringer.";
            _coachingCourseService.UpdateModuleResurce(
                mod1,
                new CoachingModuleExerciseResource() { Elements = new List<ResourceExerciseElement>(){
                    new ResourceExerciseElement("<h1>Glæden i dit seneste arbejde</h1>  <p>Jeg vil bede dig om at se tilbage på dit seneste arbejde og arbejdsplads: Hvad der betød mest for dig?</p> ") {
                        Exercise = new SortAndEvaluateExercise(
                            new List<string>() { "Mening", "Chef", "Indfldelse", "Resultater", "Kollegaer", "Balance" }, 
                            new CoachingModuleReference(mod1.Id)) { Description = "Find det positive" }        
                    } },
                    RevisionHistory = new ResourseRevisionHistoryReference() { ReferenceId = mod1.Exercise.RevisionHistoryReferenceId }
                });
              
            var mod2 = _coachingCourseService.CreateNewModuleInCourse(course, "Læg en plan og hold den");
            mod2.Description = "Planlægning kan hjælpe dig med at komme videre. Start med at lægge en plan for den nærmeste fremtid.";
            _coachingCourseService.UpdateModuleResurce(
                mod2,
                new CoachingModuleExerciseResource()
                {
                    Elements = new List<ResourceExerciseElement>(){
                    new ResourceExerciseElement("<h1>Personlighedstest fra KP explorer</h1> <p>Denne øvelse skal give dig et overblik over din personlige profil. </p> <h3>Guide</h3> <p>Prøv at læse de præsenterede udsagn, således at du besvarer dem så spontant som muligt. Følg så vidt muligt din første indskydelse.<br/>Brug maksimalt 40 minutter på hele besvarelsen, og undgå så vidt muligt at holde pauser.</p> ") {
                        Exercise = new KPExplorerQuestionnaire(
                            new List<string>() { "Jeg er mere optaget af de aktuelle opgaver end fremtiden", "Jeg arbejder bedst uforstyrret", "Planlægning skal afdække de overordnede problematikker, og i mendre grad detaljerne" },
                            new CoachingModuleReference(mod2.Id)) { Description = "Find din personlige profil" }
                    } },
                    RevisionHistory = new ResourseRevisionHistoryReference() { ReferenceId = mod2.Exercise.RevisionHistoryReferenceId }
                });

            _coachingCourseService.CreateNewModuleInCourse(course, "Successhistorier");
            _coachingCourseService.CreateNewModuleInCourse(course, "Dit talent");
            _coachingCourseService.CreateNewModuleInCourse(course, "Dine personlige kompetencer");
            _coachingCourseService.CreateNewModuleInCourse(course, "Motivation");

            _coachingCourseService.CreateNewModuleInCourse(course, "Linkedin profil");
            _coachingCourseService.CreateNewModuleInCourse(course, "Mulighederne - dig og din nye arbejdsplads");
            _coachingCourseService.CreateNewModuleInCourse(course, "Netværk og social kapital");
            _coachingCourseService.CreateNewModuleInCourse(course, "Nettet");;
            _coachingCourseService.CreateNewModuleInCourse(course, "Massiv indsats - hit med jobbet");
            _coachingCourseService.CreateNewModuleInCourse(course, "Jobtilbud / jobafslag");


        }
    }
}
