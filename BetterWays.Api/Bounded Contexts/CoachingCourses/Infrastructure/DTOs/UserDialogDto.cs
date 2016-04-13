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
        
        [JsonProperty(PropertyName = "receiver")]
        public Guid Receiver { get; set; }

        [JsonProperty(PropertyName = "receiverDescripton")]
        public string ReceiverDescripton { get; set; }

        [JsonProperty(PropertyName = "receiverFullName")]
        public string ReceiverFullName { get; set; }

    }
}