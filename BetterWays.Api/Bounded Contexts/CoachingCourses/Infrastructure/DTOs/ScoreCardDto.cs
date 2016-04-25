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

        [JsonProperty(PropertyName = "exercise")]
        public ModuleExerciseElementDTO Exercise { get; set; }
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

    public class VideoExerciseScoreCardDto : ScoreCardDto
    {

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
        [JsonProperty(PropertyName = "elapsedTimeSeconds")]
        public int ElapsedTimeSeconds { get; set; }
    }

    public class ReflectionScoreCardDto : ScoreCardDto
    {
        [JsonProperty(PropertyName = "responses")]
        public List<QuestionResponseDto> Responses { get; set; }
    }

    public class PromiseScoreCardDto : ScoreCardDto
    {
        [JsonProperty(PropertyName = "responses")]
        public List<QuestionResponseDto> Responses { get; set; }

        [JsonProperty(PropertyName = "promiseText")]
        public string PromiseText { get; set; }

        [JsonProperty(PropertyName = "exerciseGoalText")]
        public string ExerciseGoalText { get; set; }
    }

    public class GoalScoreCardDto : ScoreCardDto
    {
        [JsonProperty(PropertyName = "goalText")]
        public string GoalText { get; set; }

        [JsonProperty(PropertyName = "previousModulePromiseText")]
        public string PreviousModulePromiseText { get; set; }
    }
}