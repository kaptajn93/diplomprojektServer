using BetterWays.Api.Bounded_Contexts.Shared.Infrastructure;
using System.Web.Http;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Controllers
{
    public class ExerciseController : ApiController
    {
        // POST api/exercise
        public bool Post([FromBody]string videoUuid)
        {
            var apiKey = "live_d54b425a127f44b8e0f60904867d9b57aeaa9775";

            var emailSender = new EmailSenderSendWithUs(apiKey);

            var data = new
            {
                Username = "Mikkel",
                VideoUUID = videoUuid
            };

            emailSender.SendEmail("mih@miracle.dk", data);

            return true;
        }
    }
}