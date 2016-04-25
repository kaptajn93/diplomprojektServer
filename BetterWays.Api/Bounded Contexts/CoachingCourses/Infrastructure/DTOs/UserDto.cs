using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs
{
    public class UserDto : BaseUserDto
    {
        [JsonProperty(PropertyName = "facebookId")]
        public string FacebookId { get; set; }

        [JsonProperty(PropertyName = "courseAdmissions")]
        public List<CourseAdmissionDto> CourseAdmissions { get; set; }
    }

}