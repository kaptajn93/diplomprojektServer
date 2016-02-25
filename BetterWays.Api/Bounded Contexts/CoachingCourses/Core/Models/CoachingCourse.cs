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
    public class CoachingCourse : AggregateRoot
    {
        /// <summary>
        /// Name of this course
        /// </summary>
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        /// <summary>
        /// List of modules composing this course
        /// </summary>
        /// 
        [JsonProperty(PropertyName = "modules")]
        public List<CoachingModuleReference> Modules { get; set; }


        public CoachingCourse(string name)
        {
            Name = name;
            Modules = new List<CoachingModuleReference>();
        }

        public void AddCoachingModule(
            CoachingModule module
            /*string name, 
            CoachingModuleResource introduction,
            CoachingModuleResource exercise,
            CoachingModuleResource reflection*/)
        {
            

            //Add to collection
            Modules.Add(new CoachingModuleReference (module.Id) );
        }
    }
}
