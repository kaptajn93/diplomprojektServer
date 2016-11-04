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
        /// priority on dashboard
        /// </summary>
        [JsonProperty(PropertyName = "priority")]
        public int Priority;

        /// <summary>
        /// Name and headline of module
        /// </summary>
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        /// <summary>
        /// Short description
        /// </summary>
        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }
        
        /// <summary>
        /// Display on dashboard
        /// </summary>
        [JsonProperty(PropertyName = "peptalk")]
        public string Peptalk { get; set; }

        /// <summary>
        /// The index of this module in the course
        /// </summary>
        [JsonProperty(PropertyName = "moduleIndex")]
        public int ModuleIndex { get; set; }

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


        /// Reflection part of module
        /// </summary>
        [JsonProperty(PropertyName = "reflection")]
        public CoachingModuleResourceReference Reflection { get; set; }

        /// <summary>
        /// The group of modules, that this module belongs to
        /// </summary>
        [JsonProperty(PropertyName = "groupId")]
        public Guid GroupId { get; set; }
        /// <summary>
        
        public CoachingModule()
        {

        }

        public CoachingModule(
            string name, 
            CoachingModuleResource introduction,
            CoachingModuleExerciseResource exercise,
            CoachingModuleExerciseResource reflection)
        {
            Priority = 0;
            Name = name;
            Description = "";
            Peptalk = "";
            Introduction = new CoachingModuleResourceReference(introduction.Id, introduction.RevisionHistory.ReferenceId);
            Exercise = new CoachingModuleResourceReference(exercise.Id, exercise.RevisionHistory.ReferenceId) ;
            Reflection =  new CoachingModuleResourceReference(reflection.Id, reflection.RevisionHistory.ReferenceId) ;
        }
    }
}
