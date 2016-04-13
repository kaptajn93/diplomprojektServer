using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.User;
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

            //Check that this dialog has not already been created
            if (dialogRepo.GetItems(d =>
                (d.OwnerId == request.UserA && d.ReceiverId == request.UserB) ||
                (d.OwnerId == request.UserB && d.ReceiverId == request.UserA)).Any())
                throw new Exception(String.Format("Dialog with users {0} and {1} already exists", request.UserA, request.UserB));

            var dialogA = new UserDialog() { OwnerId = request.UserA, ReceiverId = request.UserB, ReceiverDescription = request.UserBDescription, Entries = new List<DialogEntry>() };
            var dialogB = new UserDialog() { OwnerId = request.UserB, ReceiverId = request.UserA, ReceiverDescription = request.UserADescription, Entries = new List<DialogEntry>() };

            //Persist dialog
            dialogRepo.SaveItem(dialogA);
            dialogRepo.SaveItem(dialogB);

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

            var dialogSender = dialogRepo.GetItems(d => d.OwnerId == request.SenderUserId && d.ReceiverId == request.ReceiverUserId).Single();
            var dialogReceiver = dialogRepo.GetItems(d => d.OwnerId == request.ReceiverUserId && d.ReceiverId == request.SenderUserId).Single();
            var sender = userRepo.GetUserById(request.SenderUserId);

            var dateTime = DateTime.Now;

            var entry = new DialogEntry
            {
                TimeStamp = dateTime,
                Text = request.Message,
                SenderId = request.SenderUserId
            };

            //Add entry to sender dialog
            dialogSender.Entries.Add(entry);

            //Add entry to receiver dialog
            dialogReceiver.Entries.Add(entry);

            return new DialogEntryDTO
            {
                SenderImgageUrl = "",
                SenderName = sender.FirstName + " " + sender.LastName,
                TimeStamp = entry.TimeStamp,
                Text = entry.Text
            };
        }
    }
}