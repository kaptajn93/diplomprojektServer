using BetterWays.Api.Bounded_Contexts.Shared.Infrastructure;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace BetterWays.Api.Bounded_Contexts.Notifications.Infrastructure.Controllers
{
    public class NotificationsController : ApiController
    {
        // GET api/notifications
        public bool Get()
        {
            var authId = "MAMZG2OGU1ZJZIZDC0ZW";
            var authToken = "MDhiMWI5Y2U2ZTRjZTdkODFjOTQzNTY3YTk5OGVk";

            var smsSender = new SmsSenderPlivo(authId, authToken);

            smsSender.SendSms("4553747204", "Hej fra BetterWays reflektion.");

            return true;
        }
    }
}