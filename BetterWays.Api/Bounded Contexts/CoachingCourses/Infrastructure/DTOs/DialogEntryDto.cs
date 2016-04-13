using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs
{
    public class DialogEntryDTO
    {
        [JsonProperty(PropertyName = "senderName")]
        public string SenderName { get; set; }
        [JsonProperty(PropertyName = "senderImageUrl")]
        public string SenderImgageUrl { get; set; }
        [JsonProperty(PropertyName = "timeStamp")]
        public DateTime TimeStamp { get; set; }
        [JsonProperty(PropertyName = "text")]
        public string Text { get; set; }

    }
}