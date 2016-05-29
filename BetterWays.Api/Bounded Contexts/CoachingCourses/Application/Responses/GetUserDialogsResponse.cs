using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Responses
{
    public class GetUserDialogsResponse
    {
        [JsonProperty(PropertyName = "userDialogs")]
        public IEnumerable<UserDialogDto> UserDialogs { get; set; }

        [JsonProperty(PropertyName = "latestUnread")]
        public DialogEntryDTO LatestUnread { get; set; }

        [JsonProperty(PropertyName = "numUnread")]
        public int NumUnread { get; set; }
    }
}