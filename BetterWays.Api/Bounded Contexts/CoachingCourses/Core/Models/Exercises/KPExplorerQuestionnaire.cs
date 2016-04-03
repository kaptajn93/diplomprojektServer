using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises
{
    public class KPExplorerQuestionnaire : BaseExercise
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
            return new KPExplorerQuestionnaireScoreCard(Module, Id, Description);
        }
        public KPExplorerQuestionnaire(List<string> questions, CoachingModuleReference module)
            : base(module, "KPExplorerQuestionnaire")
        {
            this.Questions = questions;
        }
    }
}