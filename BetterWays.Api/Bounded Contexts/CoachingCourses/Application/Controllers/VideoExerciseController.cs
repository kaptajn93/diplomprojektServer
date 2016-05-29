using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.User;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Services;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs.Converters;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Repositories;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Requests;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Responses;
using BetterWays.Api.Bounded_Contexts.Shared.Infrastructure;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Controllers
{
    public class VideoExerciseController : ApiController
    {
        // POST api/exercise
        [Route("api/videoExercise/")]
        [AcceptVerbs("Post")]
        public bool Post(ShareVideoRequest request)
        {
            var userRepo = new UserRepositoryDocumentDB();
            //Load user
            var usr = userRepo.GetUserById((Guid)HttpContext.Current.Items["UserId"]);
            var exercise = usr.CourseAdmissions.SelectMany(ca => ca.Results).Single(r => r.ExerciseId == request.ExerciseId) as VideoExerciseScoreCard;

            if (exercise.Phase != 2)
                throw new Exception("Unexpected phase");

            var redirrectUrl = ConfigurationManager.AppSettings["videoReviewRedirrectUrl"];
            var apiKey = "live_d54b425a127f44b8e0f60904867d9b57aeaa9775";

            var emailSender = new EmailSenderSendWithUs(apiKey);

            var data = new
            {
                Username = usr.FirstName + " " + usr.LastName,
                Userimageurl = usr.ImageUrl,
                VideoUrl = redirrectUrl + "/#/videoreview?uuid=" + request.Uuid + "&userid=" + usr.Id,
                MessageToReviewer = exercise.MesageToReviewer
            };

            emailSender.SendEmail(exercise.ReviewerEmail, data);

            exercise.Phase = 3;
            exercise.VideoUuid = request.Uuid;

            userRepo.SaveUser(usr);

            return true;
        }

        [Route("api/videoExercise/user/{userId}/video/{uuid}/")]
        [AcceptVerbs("Get")]
        [AllowAnonymous]
        public GetUserVideoResultResponse GetUserVideoResult(Guid userId,string uuid)
        {
            var userRepo = new UserRepositoryDocumentDB();
            var usr = userRepo.GetUserById(userId);

            foreach (var admission in usr.CourseAdmissions)
            {
                var excistingScoreCard = admission.Results.OfType<VideoExerciseScoreCard>().SingleOrDefault(r => r.VideoUuid == uuid);

                var ret = new GetUserVideoResultResponse();

                ret.ScoreCard = UserDtoConverter.ConvertScoreCardDto(excistingScoreCard);
                ret.UserFirstName = usr.FirstName;
                ret.UserLastName = usr.LastName;

                return ret;
            }

            throw new Exception("Scorecard not found");

        }

        [Route("api/videoExercise/user/{userId}/video/{uuid}/reply")]
        [AcceptVerbs("Post")]
        [AllowAnonymous]
        public void PostUserVideoReply(Guid userId, string uuid, PostVideoReplyRequest request)
        {
            var userRepo = new UserRepositoryDocumentDB();
            var dialogRepo = new DialogRepositoryDocumentDb();
            var usr = userRepo.GetUserById(userId);

            foreach (var admission in usr.CourseAdmissions)
            {
                var excistingScoreCard = admission.Results.OfType<VideoExerciseScoreCard>().Single(r => r.VideoUuid == uuid);

                if (excistingScoreCard.Phase > 3)
                    throw new UnauthorizedAccessException("Review already has reply");

                excistingScoreCard.VideoReply = request.Reply;
                excistingScoreCard.Phase = 4;
                excistingScoreCard.IsCompleted = true;
                userRepo.SaveUser(usr);

                //Create reviewer as user

                var userService = new UserService(
                    userRepo, new DialogRepositoryDocumentDb());

                var reviewerUser = userService.CreateUser(
                    Guid.NewGuid().ToString(), 
                    excistingScoreCard.ReviewerFirstName, 
                    excistingScoreCard.ReviewerLastName, 
                    Guid.NewGuid().ToString(), 
                    excistingScoreCard.ReviewerEmail, 
                    new List<String> { "Friend" }, null);

                //Create dialog
                var dialogService = new DialogService(dialogRepo);
                dialogService.InitiateDialog(usr.Id, reviewerUser.Id, "Din ven", "Din ven");

                var entry1 = dialogService.Post(usr.Id, reviewerUser.Id, excistingScoreCard.MesageToReviewer);
                var entry2 = dialogService.Post(reviewerUser.Id, usr.Id, request.Reply);

                return;
            }

            throw new Exception("Scorecard not found");

        }
    }
}