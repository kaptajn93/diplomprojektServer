using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs.Converters
{
    public class UserDtoConverter
    {
        public static UserDto ConvertToDTO(User entity)
        {
            return new UserDto
            {
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                CourseAdmissions = entity.CourseAdmissions != null ? entity.CourseAdmissions.Select(ConvertCourseadmissionToDTO).ToList() : null
            };
        }

        public static CourseAdmissionDto ConvertCourseadmissionToDTO(UserCourseAdmission entity)
        {
            return new CourseAdmissionDto
            {
                CourseId = entity.CourseId,
                Results = entity.Results.Select(ConvertScoreCardDto).ToList()
            };
        }

        public static ScoreCardDto ConvertScoreCardDto(BaseScoreCard entity)
        {
            if (entity == null)
                return null;

            if (entity is SortAndEvaluateScoreCard)
                return ConvertScoreCardDto(entity as SortAndEvaluateScoreCard);
            else if (entity is KPExplorerQuestionnaireScoreCard)
                return ConvertScoreCardDto(entity as KPExplorerQuestionnaireScoreCard);
            else
                return new ScoreCardDto
                {
                    IsCompleted = entity.IsCompleted,
                    ModuleId = entity.Module != null ? new Guid?(entity.Module.ModuleReferenceId) : null,
                    ExerciseDescription = entity.ExerciseDescription,
                    ExerciseId = entity.ExerciseId
                };
        }
        
        private static SortAndEvaluateResultDto ConvertEvaluationResultToDto(EvaluationResult evaluationResult)
        {
            return new SortAndEvaluateResultDto()
            {
                Description = evaluationResult.Description,
                Meaning = evaluationResult.Meaning,
                Effect = evaluationResult.Effect,
                Title = evaluationResult.Title
            };
        }

        public static SortAndEvaluateScoreCardDto ConvertScoreCardDto(SortAndEvaluateScoreCard entity)
        {
            if (entity == null)
                return null;

            return new SortAndEvaluateScoreCardDto
            {
                IsCompleted = entity.IsCompleted,
                ModuleId = entity.Module != null ? new Guid?(entity.Module.ModuleReferenceId) : null,
                ExerciseDescription = entity.ExerciseDescription,
                ExerciseId = entity.ExerciseId,
                Evaluations = entity.Evaluations != null ? entity.Evaluations.Select(ConvertEvaluationResultToDto).ToList() : null
            };
        }

        private static QuestionResponseDto ConvertKpExplorerQuestionaireResultToDto(QuestionResponse entity)
        {
            return new QuestionResponseDto()
            {
                Question = entity.Question,
                Score = entity.Score
            };
        }

        public static KPExplorerQuestionnaireScoreCardDto ConvertScoreCardDto(KPExplorerQuestionnaireScoreCard entity)
        {
            return new KPExplorerQuestionnaireScoreCardDto()
            {
                ExerciseDescription = entity.ExerciseDescription,
                ExerciseId = entity.ExerciseId,
                IsCompleted = entity.IsCompleted,
                ModuleId = entity.Module != null ? new Guid?(entity.Module.ModuleReferenceId) : null,
                Responses = entity.Responses != null ? entity.Responses.Select(ConvertKpExplorerQuestionaireResultToDto).ToList() : null,
                ElapsedTimeSeconds = entity.ElapsedTimeSeconds
            };
        }
    }
}