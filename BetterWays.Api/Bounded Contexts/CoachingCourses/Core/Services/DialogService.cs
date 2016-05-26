using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.User;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Services
{
    public class DialogService
    {
        private IDialogRepository _dialogRepository;

        public DialogService(IDialogRepository dialogRepository)
        {
            _dialogRepository = dialogRepository;
        }

        public UserDialog InitiateDialog(Guid userA, Guid userB, string userADescription, string userBDescription)
        {
            //Check that this dialog has not already been created
            if (_dialogRepository.GetDialogFromUsers(userA, userB).Any())
                throw new Exception(String.Format("Dialog with users {0} and {1} already exists", userA, userB));

            var dialogA = new UserDialog() { OwnerId = userA, ReceiverId = userB, SenderDescription = userADescription, Entries = new List<DialogEntry>() };
            var dialogB = new UserDialog() { OwnerId = userB, ReceiverId = userA, SenderDescription = userBDescription, Entries = new List<DialogEntry>() };

            //Persist dialog
            _dialogRepository.SaveDialog(dialogA);
            _dialogRepository.SaveDialog(dialogB);

            return dialogA;
        }

        public DialogEntry Post(Guid senderUserId, Guid receiverUserId, string message)
        {
            //Get user and dialogs
            var dialogs = _dialogRepository.GetDialogFromUsers(senderUserId, receiverUserId);

            if (dialogs.Count() != 2)
                throw new Exception("Unexpected number of dialogs");

            var dialogSender = dialogs.Single(d => d.OwnerId == senderUserId && d.ReceiverId == receiverUserId);
            var dialogReceiver = dialogs.Single(d => d.OwnerId == receiverUserId && d.ReceiverId == senderUserId);

            var dateTime = DateTime.Now;

            var entrySender = new DialogEntry
            {
                TimeStamp = dateTime,
                Text = message,
                SenderId = senderUserId,
                IsRead = false
            };

            var entryReceiver = new DialogEntry
            {
                TimeStamp = dateTime,
                Text = message,
                SenderId = senderUserId,
                IsRead = true
            };

            //Add entry to sender dialog
            dialogSender.Entries.Add(entrySender);

            //Add entry to receiver dialog
            dialogReceiver.Entries.Add(entryReceiver);

            _dialogRepository.SaveDialog(dialogSender);
            _dialogRepository.SaveDialog(dialogReceiver);

            return entrySender;
        }

        public IEnumerable<UserDialog> GetUserDialogs(Guid userId)
        {
            return _dialogRepository.GetUserReceivedDialogs(userId);
        }

        public UserDialog GetOpositDialog(UserDialog dialog)
        {
            return _dialogRepository.GetOppositeDialog(dialog);
        }
    }
}