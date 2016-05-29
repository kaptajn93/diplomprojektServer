using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs
{
    public class CourseAdmissionDto
    {
        [JsonProperty(PropertyName = "courseId")]
        public Guid CourseId { get; set; }

        [JsonProperty(PropertyName = "results")]
        public List<ScoreCardDto> Results { get; set; }
    }
}