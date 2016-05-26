using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises
{
    public class SortAndEvaluateExercise : BaseExercise
    {
        [JsonProperty(PropertyName = "sortables")]
        public List<string> Sorables { get; set; }

        [JsonIgnore]
        public override string Configuration
        {
            get { return string.Join(";", Sorables); }
        }

        public override BaseScoreCard GetEmptyScoreCard()
        {
            return new SortAndEvaluateScoreCard(Module, Id, Description) ;
        }

        public SortAndEvaluateExercise(List<string> sortables, CoachingModuleReference module)
            : base(module, "SortAndEvaluate")
        {
            this.Sorables = sortables;
        }
    }
}