using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs
{
    public class UserDialogDto
    {
        [JsonProperty(PropertyName = "entries")]
        public List<DialogEntryDTO> Entries { get; set; }

        [JsonProperty(PropertyName = "latestEntry")]
        public DialogEntryDTO LatestEntry { get; set; }

        [JsonProperty(PropertyName = "receiver")]
        public Guid Receiver { get; set; }

        [JsonProperty(PropertyName = "sender")]
        public Guid Sender { get; set; }

        [JsonProperty(PropertyName = "senderDescripton")]
        public string SenderDescripton { get; set; }

        [JsonProperty(PropertyName = "senderFullName")]
        public string SenderFullName { get; set; }
        
        [JsonProperty(PropertyName = "senderFirstName")]
        public string SenderFirstName { get; set; }

        [JsonProperty(PropertyName = "senderImageUrl")]
        public string SenderImageUrl { get; set; }

    }
}