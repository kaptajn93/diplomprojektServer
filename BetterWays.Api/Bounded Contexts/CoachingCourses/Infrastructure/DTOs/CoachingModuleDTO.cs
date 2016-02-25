using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs
{
    public class CoachingModuleDTO
    {
        [JsonProperty(PropertyName = "id")]
        public Guid Id { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "introduction")]
        public Guid Introduction { get; set; }
        [JsonProperty(PropertyName = "exercise")]
        public Guid Exercise { get; set; }
        [JsonProperty(PropertyName = "reflection")]
        public Guid Reflection { get; set; }
    }
}