using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Requests
{
    public class UpdateModuleExerciseRequest
    {
        [JsonProperty(PropertyName = "resourceId")]
        public Guid ResourceId { get; set; }

        [JsonProperty(PropertyName = "moduleId")]
        public Guid ModuleId { get; set; }

        [JsonProperty(PropertyName = "updatedElements")]
        public List<ModuleExerciseElementDTO> UpdatedElements { get; set; }
    }
}