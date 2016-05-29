using BetterWays.Api.BoundedContexts.Shared.Domain;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.User
{
    public class UserDialog : AggregateRoot
    {
        [JsonProperty(PropertyName = "senderDescription")]
        public string SenderDescription { get; set; }

        [JsonProperty(PropertyName = "entries")]
        public List<UserDialogEntry> Entries { get; set; }

        [JsonProperty(PropertyName = "ownerId")]
        public Guid OwnerId { get; set; }
        [JsonProperty(PropertyName = "receiverId")]
        public Guid ReceiverId { get; set; }

    }
}