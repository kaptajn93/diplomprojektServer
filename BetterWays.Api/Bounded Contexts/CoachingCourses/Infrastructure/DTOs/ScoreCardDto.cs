using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs
{
    public class ScoreCardDto
    {
        [JsonProperty(PropertyName = "exerciseId")]
        public Guid ExerciseId { get; set; }

        [JsonProperty(PropertyName = "isCompleted")]
        public bool IsCompleted { get; set; }

        [JsonProperty(PropertyName = "moduleId")]
        public Guid? ModuleId { get; set; }

        [JsonProperty(PropertyName = "exerciseDescription")]
        public string ExerciseDescription { get; set; }
    }

    public class SortAndEvaluateResultDto
    {
        [JsonProperty(PropertyName = "title")]
        public string Title { get; set; }
        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }
        [JsonProperty(PropertyName = "meaning")]
        public string Meaning { get; set; }
        [JsonProperty(PropertyName = "effect")]
        public string Effect { get; set; }
    }

    public class SortAndEvaluateScoreCardDto : ScoreCardDto
    {
        [JsonProperty(PropertyName = "evaluations")]
        public List<SortAndEvaluateResultDto> Evaluations { get; set; }
    }

    public class QuestionResponseDto
    {
        [JsonProperty(PropertyName = "score")]
        public int Score { get; set; }
        [JsonProperty(PropertyName = "question")]
        public string Question { get; set; }
    }

    public class KPExplorerQuestionnaireScoreCardDto : ScoreCardDto
    {
        [JsonProperty(PropertyName = "responses")]
        public List<QuestionResponseDto> Responses { get; set; }
    }
}