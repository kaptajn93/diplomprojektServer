using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Requests
{
    public class CreateModuleInCourseRequest
    {
        [JsonProperty(PropertyName = "courseId")]
        public Guid CourseId { get; set; }
        [JsonProperty(PropertyName = "moduleName")]
        public string ModuleName { get; set; }
    }
}