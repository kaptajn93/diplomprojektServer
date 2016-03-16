using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models;
using BetterWays.Api.BoundedContexts.Shared.Domain;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BetterWays.Api.BoundedContexts.CoachingCourses.Core.Models
{
    public class CoachingModule : AggregateRoot
    {
        /// <summary>
        /// Name and headline of module
        /// </summary>
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        
        /// <summary>
        /// Introduction part of module
        /// </summary>
        [JsonProperty(PropertyName = "introduction")]
        public CoachingModuleResourceReference Introduction { get; set; }

        /// <summary>
        /// Exercise part of module
        /// </summary>
        [JsonProperty(PropertyName = "exercise")]
        public CoachingModuleResourceReference Exercise { get; set; }

        /// <summary>
        /// Reflection part of module
        /// </summary>
        [JsonProperty(PropertyName = "reflection")]
        public CoachingModuleResourceReference Reflection { get; set; }

        public CoachingModule()
        {

        }

        public CoachingModule(
            string name, 
            CoachingModuleResource introduction,
            CoachingModuleExerciseResource exercise,
            CoachingModuleExerciseResource reflection)
        {
            Name = name;

            Introduction = new CoachingModuleResourceReference(introduction.Id, introduction.RevisionHistory.ReferenceId);
            Exercise = new CoachingModuleResourceReference(exercise.Id, exercise.RevisionHistory.ReferenceId) ;
            Reflection =  new CoachingModuleResourceReference(reflection.Id, reflection.RevisionHistory.ReferenceId) ;
        }
    }
}
