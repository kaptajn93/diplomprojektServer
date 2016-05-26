using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises
{
    
    public class PromiseExercise : BaseExercise
    {
        [JsonProperty(PropertyName = "questions")]
        public List<string> Questions { get; set; }

        [JsonIgnore]
        public override string Configuration
        {
            get { return string.Join(";", Questions); }
        }
        
        public override BaseScoreCard GetEmptyScoreCard()
        {
            return new PromiseScoreCard(Module, Id, Description);
        }
        
        public PromiseExercise(List<string> questions, CoachingModuleReference module)
            : base(module, "Promise")
        {
            Questions = questions;
        }
    }
}