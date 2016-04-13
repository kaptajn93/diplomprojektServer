using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Requests
{
    public class PostDialogRequest
    {
        public string Message { get; set; }
        public Guid ReceiverUserId { get; set; }
        public Guid SenderUserId { get; set; }

    }
}