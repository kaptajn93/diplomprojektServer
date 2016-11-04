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
        public void InitCourseWithModules()
        {
            var moduleRepo = new CoachingModuleRepositoryDocumentDB();
            var courseName = "Better ways course";
            //Create the course
            var course = _coachingCourseService.CreateNewCoachingCourse(courseName);

            var mod1 = _coachingCourseService.CreateNewModuleInCourse(course, "Fyret. Hvad nu?", 0);
            Assert.IsNotNull(mod1.Exercise);

            mod1.Description = "Find det positive i dit seneste job, og undgå negativiteten. Se fremad, mod nye udfordringer.";
            _coachingCourseService.UpdateModuleResurce(
                mod1,
                new CoachingModuleExerciseResource() { Elements = new List<ResourceExerciseElement>(){
                    new ResourceExerciseElement("") {
                        Exercise = new GoalExercise(new CoachingModuleReference(mod1.Id, mod1.Priority))
                    },
                    new ResourceExerciseElement("<h1>Glæden i dit seneste arbejde</h1>  <p>Jeg vil bede dig om at se tilbage på dit seneste arbejde og arbejdsplads: Hvad der betød mest for dig?</p> ") {
                        Exercise = new SortAndEvaluateExercise(
                            new List<string>() { "Mening", "Chef", "Indfldelse", "Resultater", "Kollegaer", "Balance" },
                            new CoachingModuleReference(mod1.Id, mod1.Priority)) {
                                Description = "Find det positive",
                                InstrunctionContent = new List<string> {
                                    "<p>Når du er klar skal du trykke, 'Start øvelse':</p>",
                                    "<p>Jeg vil bede dig om at se tilbage på dit seneste arbejde og arbejdsplads: Hvad der betød mest for dig? Det mest betydningsfulde skal du placere øverst, og det mindst betydningsfulde nederst. Tryk 'færdig' når du er klar.</p>",
                                    "<p>Der har været en hel række af begivenheder, situationer og hændelser som du husker tilbage på med forskellige følelser.</p><p>Jeg vil bede dig om at kigge tilbage på de oplevelser du har haft med [dine prioiteringer] – OG særlige oplevelser der har fyldt dig med glæde. Vær opmærksom på at her skal du kun gå i detaljer med det der har en positiv indvirken på dig.</p><p>Det andet vil jeg bede dig om at lade ligge som blot en konstatering – at der var situationer som ikke gik din vej. Dyrk det der fungerer for dig og lær hvordan du kan øge lige præcist det der styrker dig.</p>",
                                    "<p>Fortæl om en positiv oplevelse vedrørende din(e)</p>",
                                    "<h2>Øvelsen er færdig</h2><p>Her er din besvarelse, sorteret med det mest betydningsfulde, først:</p>"
                                }
                            }
                    } },
                    RevisionHistory = new ResourseRevisionHistoryReference() { ReferenceId = mod1.Exercise.RevisionHistoryReferenceId }
                });
              
            var mod2 = _coachingCourseService.CreateNewModuleInCourse(course, "Læg en plan og hold den", 1);
            mod2.Description = "Planlægning kan hjælpe dig med at komme videre. Start med at lægge en plan for den nærmeste fremtid.";
            _coachingCourseService.UpdateModuleResurce(
                mod2,
                new CoachingModuleExerciseResource()
                {
                    Elements = new List<ResourceExerciseElement>(){
                    new ResourceExerciseElement("") {
                        Exercise = new GoalExercise(new CoachingModuleReference(mod2.Id, mod2.Priority))
                        
                    },
                    new ResourceExerciseElement("<h1>Personlighedstest fra KP explorer</h1> <p>Denne øvelse skal give dig et overblik over din personlige profil. </p> <h3>Guide</h3> <p>Prøv at læse de præsenterede udsagn, således at du besvarer dem så spontant som muligt. Følg så vidt muligt din første indskydelse.<br/>Brug maksimalt 40 minutter på hele besvarelsen, og undgå så vidt muligt at holde pauser.</p> ") {
                        Exercise = new KPExplorerQuestionnaire(
                            
                            new CoachingModuleReference(mod2.Id, mod2.Priority)) {
                                Description = "Find din personlige profil",
                                InstrunctionContent = new List<string>() {
                                    "<p>Når du er klar skal du trykke, 'Start øvelse':</p>",
                                    "<h2>Øvelsen er færdig</h2><p>Din coach vil snart sende dig resultatet</p>"
                                
                                } 
                            }
                    } },
                    RevisionHistory = new ResourseRevisionHistoryReference() { ReferenceId = mod2.Exercise.RevisionHistoryReferenceId }
                });

            _coachingCourseService.CreateNewModuleInCourse(course, "Successhistorier", 2);
            _coachingCourseService.CreateNewModuleInCourse(course, "Dit talent", 3);
            _coachingCourseService.CreateNewModuleInCourse(course, "Dine personlige kompetencer", 4);
            _coachingCourseService.CreateNewModuleInCourse(course, "Motivation", 5);

            _coachingCourseService.CreateNewModuleInCourse(course, "Linkedin profil", 6);
            _coachingCourseService.CreateNewModuleInCourse(course, "Mulighederne - dig og din nye arbejdsplads", 7);
            _coachingCourseService.CreateNewModuleInCourse(course, "Netværk og social kapital", 8);
            _coachingCourseService.CreateNewModuleInCourse(course, "Nettet", 9);
            _coachingCourseService.CreateNewModuleInCourse(course, "Massiv indsats - hit med jobbet", 10);
            _coachingCourseService.CreateNewModuleInCourse(course, "Jobtilbud / jobafslag", 11);


        }
    }
}
