using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.User;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Controllers;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Repositories;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Requests;
using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Services;
using BetterWays.Api.BoundedContexts.CoachingCourses.Infrastructure.Repositories;
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
    public class DialogTest
    {
        private static DocumentClient _client;
        private static CoachingCourseService _coachingCourseService;

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
        public void CreateDialogAndPost()
        {
            //Set up http context
            HttpContext.Current = new HttpContext(
                new HttpRequest("", "http://tempuri.org", ""),
                new HttpResponse(new StringWriter())
                );
            
            var userRepo = new UserRepositoryDocumentDB();
            var userA = new User()
            {
                FirstName = "Dialog Test",
                LastName = "Sender"
            };

            var coachUser = new User()
            {
                FirstName = "Dialog Test",
                LastName = "Coach"
            };

            userRepo.CreateUser(userA);
            userRepo.CreateUser(coachUser);


            // User is logged in
            HttpContext.Current.User = new GenericPrincipal(
                new GenericIdentity("username"),
                new string[0]
                );

            HttpContext.Current.Items.Add("UserId", userA.Id);


            var dialogController = new DialogController();

            var dialog = dialogController.InitiateDialog(new InitiateDialogRequest {
                UserA = userA.Id,
                UserB = coachUser.Id,
                UserADescription = "",
                UserBDescription = "Din coach",
            });

            Assert.IsNotNull(dialog);
            Assert.AreEqual(dialog.Receiver, coachUser.Id);
            Assert.AreEqual(dialog.ReceiverFullName, coachUser.FirstName + " " + coachUser.LastName);

            //Try to send a message
            var dialogEntry = dialogController.Post(new PostDialogRequest()
            {
                Message = "Hej coach",
                ReceiverUserId = coachUser.Id ,
                SenderUserId = userA.Id
            });

            Assert.AreEqual(dialogEntry.SenderName, userA.FirstName + " " + userA.LastName);
            Assert.AreEqual(dialogEntry.Text, "Hej coach");

        }
    }
}
