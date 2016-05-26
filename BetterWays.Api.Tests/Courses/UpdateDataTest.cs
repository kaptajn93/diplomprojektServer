using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Controllers;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Repositories;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Requests;
using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Services;
using BetterWays.Api.BoundedContexts.CoachingCourses.Infrastructure.Repositories;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace BetterWays.Api.Tests.Courses
{
    [TestClass]
    public class UpdateDataTest
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
        public void UpdateGoalExerciseInstructionText()
        {
            var courseName = "Better ways course";
            //Create the course
            var courseRep = new CoachingCourseRepositoryDocumentDB();
            var moduleRep = new CoachingModuleRepositoryDocumentDB();
            var resourceRep = new CoachnigModuleExerciseResourceRepositoryDocumentDB();
            var course = courseRep.GetItems(c => c.Name == courseName).Single();
            var modules = moduleRep.GetItemsWithIds(course.Modules.Select(m => m.ModuleReferenceId)).ToList();
            var resources = resourceRep.GetItemsWithIds(modules.SelectMany(m => new[] { m.Exercise.ResourceReferenceId, m.Reflection.ResourceReferenceId })).ToList();

            var goalExercises = resources.SelectMany(r =>
                r.Elements.Where(el => el.Exercise != null && el.Exercise.ExerciseClassName == "Goal").Select(el => new { Resource = r, Exercise = el })
                ).ToList();
            foreach (var goalExercise in goalExercises)
            {
                goalExercise.Exercise.Exercise.InstrunctionContent = new List<string>() { "<p>F&oslash;r vi g&aring;r i gang skal du give dig selv et m&aring;l for &oslash;velsen</p>\n" };
                resourceRep.SaveItem(goalExercise.Resource);
            }
        }

        [TestMethod]
        public void UpdatePromiseExerciseInstructionText()
        {
            var courseName = "Better ways course";
            //Create the course
            var courseRep = new CoachingCourseRepositoryDocumentDB();
            var moduleRep = new CoachingModuleRepositoryDocumentDB();
            var resourceRep = new CoachnigModuleExerciseResourceRepositoryDocumentDB();
            var course = courseRep.GetItems(c => c.Name == courseName).Single();
            var modules = moduleRep.GetItemsWithIds(course.Modules.Select(m => m.ModuleReferenceId)).ToList();
            var resources = resourceRep.GetItemsWithIds(modules.SelectMany(m => new[] { m.Exercise.ResourceReferenceId, m.Reflection.ResourceReferenceId })).ToList();

            var goalExercises = resources.SelectMany(r =>
                r.Elements.Where(el => el.Exercise != null && el.Exercise.ExerciseClassName == "Promise").Select(el => new { Resource = r, Exercise = el })
                ).ToList();
            foreach (var goalExercise in goalExercises)
            {
                goalExercise.Exercise.Exercise.InstrunctionContent = new List<string>() { "<p>F&oslash;r vi g&aring;r videre skal du give dig selv et m&aring;l til n&aelig;ste modul</p>\n" };
                resourceRep.SaveItem(goalExercise.Resource);
            }
        }

        [TestMethod]
        public void SetupModuleGroups()
        {
            var courseRep = new CoachingCourseRepositoryDocumentDB();
            var moduleRep = new CoachingModuleRepositoryDocumentDB();
            var groupRep = new ModuleGroupRepositoryDocumentDB();

            //Find modules
            var allModules = moduleRep.GetAllItems();
            Assert.AreEqual(allModules.Count(), 12);

            var course = courseRep.GetAllItems().Single();


            //Create groups
            var grp1 = new ModuleGroup() {
                GroupName = "Læg en plan og hold den",
                GroupDescription = "Få overblik over din situation og få redskaber til at komme videre. Dette er en fase, og vi hjælper dig til at se på tingene i et ny lys."
            };

            var grp2 = new ModuleGroup()
            {
                GroupName = "Dit talent og din profil",
                GroupDescription = "Hvad er egentligt din profil? Hvad brænder du for? Måske er det tid til at skifte retning. Få klarhed og opdag nye sider af dit talent."
            };

            var grp3 = new ModuleGroup()
            {
                GroupName = "Gør dig synlig",
                GroupDescription = "Du har en unik og attraktiv profil, men får virksomhederne øje på dig? Lær at synliggøre de egenskaber der er værdifulde for din fremtidige arbejdsgiver."
            };

            var grp4 = new ModuleGroup()
            {
                GroupName = "Nå dit mål",
                GroupDescription = "Det kræver en stor indsats at finde det rette job. Det er ikke sikkert at det vil lykkedes i første hug. Lær at strukturere søgningen og få noget positivt ud af afslagene."
            };

            course.ModuleGroups = new List<Guid>() { grp1.Id, grp2.Id, grp3.Id, grp4.Id };

            var md1 = allModules.Single(m => m.ModuleIndex == 0);
            var md2 = allModules.Single(m => m.ModuleIndex == 1);
            var md3 = allModules.Single(m => m.ModuleIndex == 2);
            var md4 = allModules.Single(m => m.ModuleIndex == 3);
            var md5 = allModules.Single(m => m.ModuleIndex == 4);
            var md6 = allModules.Single(m => m.ModuleIndex == 5);
            var md7 = allModules.Single(m => m.ModuleIndex == 6);
            var md8 = allModules.Single(m => m.ModuleIndex == 7);
            var md9 = allModules.Single(m => m.ModuleIndex == 8);
            var md10 = allModules.Single(m => m.ModuleIndex == 9);
            var md11 = allModules.Single(m => m.ModuleIndex == 10);
            var md12 = allModules.Single(m => m.ModuleIndex == 11);
            
            groupRep.SaveItem(grp1);
            groupRep.SaveItem(grp2);
            groupRep.SaveItem(grp3);
            groupRep.SaveItem(grp4);

            md1.GroupId = grp1.Id;
            md2.GroupId = grp1.Id;

            md3.GroupId = grp2.Id;
            md4.GroupId = grp2.Id;
            md5.GroupId = grp2.Id;
            md6.GroupId = grp2.Id;
            md7.GroupId = grp2.Id;

            md8.GroupId = grp3.Id;
            md9.GroupId = grp3.Id;
            md10.GroupId = grp3.Id;

            md11.GroupId = grp4.Id;
            md12.GroupId = grp4.Id;

            moduleRep.SaveItem(md1);
            moduleRep.SaveItem(md2);
            moduleRep.SaveItem(md3);
            moduleRep.SaveItem(md4);
            moduleRep.SaveItem(md5);
            moduleRep.SaveItem(md6);
            moduleRep.SaveItem(md7);
            moduleRep.SaveItem(md8);
            moduleRep.SaveItem(md9);
            moduleRep.SaveItem(md10);
            moduleRep.SaveItem(md11);
            moduleRep.SaveItem(md12);

            courseRep.SaveItem(course);
        }

        [TestMethod]
        public void SetupModulePeptalk()
        {
            var courseRep = new CoachingCourseRepositoryDocumentDB();
            var moduleRep = new CoachingModuleRepositoryDocumentDB();
            var groupRep = new ModuleGroupRepositoryDocumentDB();

            //Find modules
            var allModules = moduleRep.GetAllItems();
            Assert.AreEqual(allModules.Count(), 12);
            
            var md1 = allModules.Single(m => m.ModuleIndex == 0);
            var md2 = allModules.Single(m => m.ModuleIndex == 1);
            var md3 = allModules.Single(m => m.ModuleIndex == 2);
            var md4 = allModules.Single(m => m.ModuleIndex == 3);
            var md5 = allModules.Single(m => m.ModuleIndex == 4);
            var md6 = allModules.Single(m => m.ModuleIndex == 5);
            var md7 = allModules.Single(m => m.ModuleIndex == 6);
            var md8 = allModules.Single(m => m.ModuleIndex == 7);
            var md9 = allModules.Single(m => m.ModuleIndex == 8);
            var md10 = allModules.Single(m => m.ModuleIndex == 9);
            var md11 = allModules.Single(m => m.ModuleIndex == 10);
            var md12 = allModules.Single(m => m.ModuleIndex == 11);

            md1.Peptalk = "<p>Velkommen til Better Ways - vi hjælper dig med at finde vejen til dit nye job. Du er allerede godt på vej.</p><p>Dit kursus består af 12 moduler fordelt i 4 faser. Vi starter med at se på dit tidligere job og ligge en plan for den kommende tid. Hvis du har spørgsmål er du velkommen til at skrive til din coach. For at komme i gang skal du klikke på det første modul: Fyret. Hvad nu?</p>";
            md2.Peptalk = "<p>Velkommen tilbage - du er nået til modul 2.<p></p>Husk at bevare optimismen. Din indstilling har betydning for hvordan du kommer videre.</p>";
            md3.Peptalk = "<p>Velkommen tilbage - du er nået til modul 3 - det er nu tid til at finde ud af hvem du er.<br/>Hvordan går det med at følge din plan? Det kræver tålmodighed at indarbejde nye vaner.</p><p>Har du talt med din coach? Han/hun er klar til at hjælpe dig.</p>";
            md4.Peptalk = "<p>Velkommen tilbage - du er nået til modul 2.<p>";
            md5.Peptalk = "<p>Velkommen tilbage - du er nået til modul 2.<p>";
            md6.Peptalk = "<p>Velkommen tilbage - du er nået til modul 2.<p>";
            md7.Peptalk = "<p>Velkommen tilbage - du er nået til modul 2.<p>";
            md8.Peptalk = "<p>Velkommen tilbage - du er nået til modul 2.<p>";
            md9.Peptalk = "<p>Velkommen tilbage - du er nået til modul 2.<p>";
            md10.Peptalk = "<p>Velkommen tilbage - du er nået til modul 2.<p>";
            md11.Peptalk = "<p>Velkommen tilbage - du er nået til modul 2.<p>";
            md12.Peptalk = "<p>Velkommen tilbage - du er nået til modul 2.<p>";

            moduleRep.SaveItem(md1);
            moduleRep.SaveItem(md2);
            moduleRep.SaveItem(md3);
            moduleRep.SaveItem(md4);
            moduleRep.SaveItem(md5);
            moduleRep.SaveItem(md6);
            moduleRep.SaveItem(md7);
            moduleRep.SaveItem(md8);
            moduleRep.SaveItem(md9);
            moduleRep.SaveItem(md10);
            moduleRep.SaveItem(md11);
            moduleRep.SaveItem(md12);
        }

        [TestMethod]
        public void CreateDialog()
        {
            //HCA
            var userB = new Bounded_Contexts.CoachingCourses.Core.Models.User.User() {
                Id = new Guid("be9122f0-e7f3-4030-adb9-157453f3b7b7")
            };

            var userA= new Bounded_Contexts.CoachingCourses.Core.Models.User.User()
            {
                Id = new Guid("77bca353-e5f8-44b9-85d3-672b775dc7e9")
            };

            //Set up http context
            HttpContext.Current = new HttpContext(
                new HttpRequest("", "http://tempuri.org", ""),
                new HttpResponse(new StringWriter())
                );
            

            // User is logged in
            HttpContext.Current.User = new GenericPrincipal(
                new GenericIdentity("username"),
                new string[0]
                );

            HttpContext.Current.Items.Add("UserId", userB.Id);


            var dialogController = new DialogController();

            var dialog = dialogController.InitiateDialog(new InitiateDialogRequest
            {
                UserA = userA.Id,
                UserB = userB.Id,
                UserADescription = "",
                UserBDescription = "Din ven",
            });
            

            //Try to send a message
            var dialogEntry = dialogController.Post(new PostDialogRequest()
            {
                Message = "Hej Jørgen. Godt at høre fra dig. Op med humøret!",
                ReceiverUserId = userA.Id,
                SenderUserId = userB.Id
            });

        }

    }
}
