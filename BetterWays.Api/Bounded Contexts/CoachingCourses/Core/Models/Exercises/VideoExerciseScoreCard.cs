using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises
{
    public class VideoExerciseScoreCard : BaseScoreCard
    {
        [JsonProperty(PropertyName = "reviewerFirstName")]
        public string ReviewerFirstName { get; set; }
        [JsonProperty(PropertyName = "reviewerLastName")]
        public string ReviewerLastName { get; set; }
        [JsonProperty(PropertyName = "reviewerEmail")]
        public string ReviewerEmail { get; set; }
        [JsonProperty(PropertyName = "mesageToReviewer")]
        public string MesageToReviewer { get; set; }

        [JsonProperty(PropertyName = "phase")]
        public int Phase { get; set; }

        [JsonProperty(PropertyName = "videoUuid")]
        public string VideoUuid { get; internal set; }

        [JsonProperty(PropertyName = "videoReply")]
        public string VideoReply { get; set; }

        public VideoExerciseScoreCard(CoachingModuleReference module, Guid exerciseId, string description)
            : base(module, exerciseId, description)
        {

        }
    }
}