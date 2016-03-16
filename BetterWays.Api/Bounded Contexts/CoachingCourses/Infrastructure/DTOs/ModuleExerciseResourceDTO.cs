using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs
{
    public class ModuleExerciseElementDTO
    {
        [JsonProperty(PropertyName = "content")]
        public string Content { get; set; }
        [JsonProperty(PropertyName = "className")]
        public string ClassName { get; set; }
        [JsonProperty(PropertyName = "configuration")]
        public string Configuration { get; set; }

    }

    public class ModuleExerciseResourceDTO
    {
        [JsonProperty(PropertyName = "id")]
        public Guid Id { get; set; }
        [JsonProperty(PropertyName = "created")]
        public DateTime Created { get; set; }
        [JsonProperty(PropertyName = "version")]
        public int Version { get; set; }

        [JsonProperty(PropertyName = "elements")]
        public List<ModuleExerciseElementDTO> Elements { get; set; }
    }
}