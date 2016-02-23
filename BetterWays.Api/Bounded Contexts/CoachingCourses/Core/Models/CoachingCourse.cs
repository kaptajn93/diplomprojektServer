using BetterWays.Api.BoundedContexts.Shared.Domain;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BetterWays.Api.BoundedContexts.CoachingCourses.Core.Models
{
    public class CoachingCourse : AggregateRoot
    {
        /// <summary>
        /// Name of this course
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// List of modules composing this course
        /// </summary>
        /// 
        [JsonProperty(PropertyName = "modules")]
        public List<CoachingModule> Modules { get; set; }


        public CoachingCourse(string name)
        {
            Name = name;
            Modules = new List<CoachingModule>();
        }

        public CoachingModule AddCoachingModule(
            string name, 
            CoachingModuleResource introduction,
            CoachingModuleResource exercise,
            CoachingModuleResource reflection)
        {
            var coachingModule = new CoachingModule()
            {
                Name = name,
                Introduction = new CoachingModuleResourceReference(introduction.Id, introduction.RevisionHistory.ReferenceId),
                Exercise = new CoachingModuleResourceReference(exercise.Id, exercise.RevisionHistory.ReferenceId),
                Reflection = new CoachingModuleResourceReference(reflection.Id, reflection.RevisionHistory.ReferenceId)
            };

            //Add to collection
            Modules.Add(coachingModule);
            
            return coachingModule;
        }
    }
}
