using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Repositories;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Requests;
using BetterWays.Api.Bounded_Contexts.Shared.Infrastructure;
using System;
using System.Web;
using System.Web.Http;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Controllers
{
    public class ExerciseController : ApiController
    {
        // POST api/exercise
        public bool Post(ShareVideoRequest request)
        {
            var userRepo = new UserRepositoryDocumentDB();
            //Load user
            var usr = userRepo.GetUserById((Guid)HttpContext.Current.Items["UserId"]);


            var apiKey = "live_d54b425a127f44b8e0f60904867d9b57aeaa9775";

            var emailSender = new EmailSenderSendWithUs(apiKey);

            var data = new
            {
                Username =usr.FirstName + " " + usr.LastName,
                Userimageurl = usr.ImageUrl,
                VideoUrl = "http://localhost:8080/#/videoreview?uuid=" + request.Uuid
            };

            emailSender.SendEmail("sto@miracle.dk", data);

            return true;
        }
    }
}