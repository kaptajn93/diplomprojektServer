using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises;
using BetterWays.Api.BoundedContexts.Shared.Domain;
using Microsoft.Azure.Documents;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models
{
    public class ResourceExerciseElement : ValueObject
    {
        /// <summary>
        /// HTML content, acting as header to exercise
        /// </summary>
        [JsonProperty(PropertyName = "content")]
        public string Content { get; set; }

        /// <summary>
        /// The name of the resource class
        /// </summary>
        [JsonProperty(PropertyName = "exerciseTypeName")]
        public BaseExercise Exercise { get; set; }

        /// <summary>
        /// Exercise is not required
        /// </summary>
        /// <param name="content"></param>
        public ResourceExerciseElement(string content)
        {
            Content = content;
        }
    }

    public class CoachingModuleExerciseResource : CoachingModuleBaseResource
    {
        /// <summary>
        /// All the elements composing this exercise sheet
        /// </summary>
        [JsonProperty(PropertyName = "elements")]
        public List<ResourceExerciseElement> Elements { get; set; }
        
        public CoachingModuleExerciseResource()
        {
            Elements = new List<ResourceExerciseElement>();
        }
    }
}