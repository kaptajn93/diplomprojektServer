using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Requests
{
    public class PostDialogRequest
    {
        [JsonProperty(PropertyName = "message")]
        public string Message { get; set; }
        [JsonProperty(PropertyName = "receiverUserId")]
        public Guid ReceiverUserId { get; set; }
        [JsonProperty(PropertyName = "senderUserId")]
        public Guid SenderUserId { get; set; }

    }
}