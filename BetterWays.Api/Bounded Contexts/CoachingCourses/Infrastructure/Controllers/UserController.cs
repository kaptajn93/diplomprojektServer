using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs.Converters;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Repositories;
using BetterWays.Api.BoundedContexts.CoachingCourses.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Controllers
{
    public class UserController : ApiController
    {
        public UserDto Get(Guid id)
        {
            var userRepo = new UserRepositoryDocumentDB();
            var usr = userRepo.GetUserById(id);
            return UserDtoConverter.ConvertToDTO(usr);
        }

        [Route("api/user/currentUser")]
        [AcceptVerbs("GET")]
        public UserDto CurrentUser()
        {
            var userRepo = new UserRepositoryDocumentDB();
            var usr = userRepo.GetAllItems().Last();
            return UserDtoConverter.ConvertToDTO(usr);
        }

        [Route("api/user/currentUser/results")]
        [AcceptVerbs("GET")]
        public UserResultsDto UserResults()
        {

            var userRepo = new UserRepositoryDocumentDB();
            var usr = userRepo.GetAllItems().Last();

            //Load modules
            var coachingCourseRepository = new CoachingCourseRepositoryDocumentDB();
            var coachingModuleRepository = new CoachingModuleRepositoryDocumentDB();

            //TODO: Support multiple course admissions
            var course = coachingCourseRepository.GetCourseById(usr.CourseAdmissions.Single().CourseId);
            var modules = coachingModuleRepository.GetModulesWithIds(course.Modules.Select(m => m.ModuleReferenceId)).ToList();

            var userResults = new UserResultsDto()
            {
                ModuleResults = modules.Select(m => {
                    var moduleResults = usr.CourseAdmissions.Single().Results.Where(r =>
                            r.Module.ModuleReferenceId == m.Id
                        ).ToList();

                    return new ModuleResultsDto()
                    {
                        Module = CoachingModuleDTOConverter.ConvertToDTO(m),
                        ModuleResults = moduleResults.Select(mr =>
                            UserDtoConverter.ConvertScoreCardDto(mr)).ToList()
                    };
                }).ToList()
            };

            userResults.ActiveModule = userResults.ModuleResults.First(mr => mr.ModuleResults.Any(r => !r.IsCompleted)).Module;
            userResults.ActiveModuleIndex = modules.IndexOf(modules.Single(m => m.Id == userResults.ActiveModule.Id));

            return userResults;
        }
        
        [Route("api/user/currentUser/sortandevalexercise/{exerciseId}/result/")]
        [AcceptVerbs("PUT")]
        public void UpdateSortAndEvalResults(Guid exerciseId, SortAndEvaluateScoreCardDto scoreCard)
        {
            if (exerciseId != scoreCard.ExerciseId)
                throw new Exception("Scorecard ids does not match");

            var userRepo = new UserRepositoryDocumentDB();
            var usr = userRepo.GetAllItems().Last();

            foreach (var admission in usr.CourseAdmissions)
            {
                var excistingScoreCard = admission.Results.SingleOrDefault(r => r.ExerciseId == exerciseId) as SortAndEvaluateScoreCard;

                if (excistingScoreCard != null)
                {
                    //Update the score card
                    excistingScoreCard.Evaluations = scoreCard.Evaluations.Select(e => new EvaluationResult()
                    {
                        Description = e.Description,
                        Effect = e.Effect,
                        Meaning = e.Meaning,
                        Title = e.Title
                    }).ToList();
                    excistingScoreCard.IsCompleted = scoreCard.IsCompleted;

                }
            }

            //Save user
            userRepo.SaveUser(usr);
        }

        [Route("api/user/currentUser/kpexplorerexercise/{exerciseId}/result/")]
        [AcceptVerbs("PUT")]
        public void UpdateKPExplorerResults(Guid exerciseId, KPExplorerQuestionnaireScoreCardDto scoreCard)
        {
            if (exerciseId != scoreCard.ExerciseId)
                throw new Exception("Scorecard ids does not match");

            var userRepo = new UserRepositoryDocumentDB();
            var usr = userRepo.GetAllItems().Last();

            foreach (var admission in usr.CourseAdmissions)
            {
                var excistingScoreCard = admission.Results.SingleOrDefault(r => r.ExerciseId == exerciseId) as KPExplorerQuestionnaireScoreCard;

                if (excistingScoreCard != null)
                {
                    //Update the score card
                    excistingScoreCard.Responses = scoreCard.Responses.Select(e => new QuestionResponse()
                    {
                        Score = e.Score,
                        Question = e.Question
                    }).ToList();
                    excistingScoreCard.IsCompleted = scoreCard.IsCompleted;
                    excistingScoreCard.ElapsedTimeSeconds = scoreCard.ElapsedTimeSeconds;
                }
            }

            //Save user
            userRepo.SaveUser(usr);
        }

        [Route("api/user/currentUser/exercise/{exerciseId}/result/")]
        [AcceptVerbs("Get")]
        public ScoreCardDto GetExerciseResults(Guid exerciseId)
        {
            var userRepo = new UserRepositoryDocumentDB();
            var usr = userRepo.GetAllItems().Last();

            foreach (var admission in usr.CourseAdmissions)
            {
                var excistingScoreCard = admission.Results.SingleOrDefault(r => r.ExerciseId == exerciseId);

                return UserDtoConverter.ConvertScoreCardDto(excistingScoreCard);
            }

            throw new Exception("Scorecard not found");
        }

        [Route("api/user/{userId}/exercise/{exerciseId}/result/")]
        [AcceptVerbs("Get")]
        public ScoreCardDto GetExerciseResults(Guid userId, Guid exerciseId)
        {
            var userRepo = new UserRepositoryDocumentDB();
            var usr = userRepo.GetUserById(userId);

            foreach (var admission in usr.CourseAdmissions)
            {
                var excistingScoreCard = admission.Results.SingleOrDefault(r => r.ExerciseId == exerciseId);

                return UserDtoConverter.ConvertScoreCardDto(excistingScoreCard);
            }

            throw new Exception("Scorecard not found");

        }
    }
}