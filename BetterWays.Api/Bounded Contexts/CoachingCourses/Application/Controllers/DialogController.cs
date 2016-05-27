using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.User;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Services;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs.Converters;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Repositories;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Controllers
{
    public class DialogController : ApiController
    {
        [Route("api/dialog/initiateDialog/")]
        [AcceptVerbs("POST")]
        public UserDialogDto InitiateDialog(InitiateDialogRequest request)
        {
            var userRepo = new UserRepositoryDocumentDB();
            var dialogRepo = new DialogRepositoryDocumentDb();

            var dialogService = new DialogService(dialogRepo);
            
            var dialogA = dialogService.InitiateDialog(request.UserA, request.UserB, request.UserADescription, request.UserBDescription);

            var userA = userRepo.GetUserById(request.UserA);
            var userB = userRepo.GetUserById(request.UserB);

            return UserDialogDTOConverter.ConvertToDTO(dialogA, userA, userB);
        }

        [Route("api/dialog/")]
        [AcceptVerbs("POST")]
        public DialogEntryDTO Post(PostDialogRequest request)
        {
            //Check that sender is logged in
            var currentUserId = (Guid)HttpContext.Current.Items["UserId"];

            if (request.SenderUserId != currentUserId)
                throw new Exception("Cannot send message on behalf of other user");

            //Get user and dialogs
            var userRepo = new UserRepositoryDocumentDB();
            var dialogRepo = new DialogRepositoryDocumentDb();

            var dialogService = new DialogService(dialogRepo);

            var entry = dialogService.Post(request.SenderUserId, request.ReceiverUserId, request.Message);
            var sender = userRepo.GetUserById(request.SenderUserId);

            return new DialogEntryDTO
            {
                SenderName = sender.FirstName + " " + sender.LastName,
                TimeStamp = entry.TimeStamp,
                Text = entry.Text,
                SenderImageUrl = sender.ImageUrl
            };
        }
    }
}