using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs.Converters
{
    public static class UserDialogDTOConverter
    {
        public static DialogEntryDTO ConvertToDTO(UserDialogEntry entity, User userA, User userB, UserDialog dialog)
        {
            User sender  = entity.SenderId == userA.Id ? userA : entity.SenderId == userB.Id ? userB : null;
            
            if (sender == null)
                throw new Exception("Unexected user in dialog entry");

            return new DialogEntryDTO()
            {
                SenderName = sender.FirstName,
                SenderImageUrl = sender.ImageUrl,
                Text = entity.Text,
                TimeStamp = entity.TimeStamp,
                SenderDescription = dialog.SenderDescription,
                SenderId = sender.Id
            };
        }

        public static UserDialogDto ConvertToDTO(UserDialog entity, User userA, User userB) {
            var sender = entity.OwnerId == userA.Id ? userA : entity.OwnerId == userB.Id ? userB : null;
            var entries = entity.Entries.OrderBy(e => e.TimeStamp).Select(e => ConvertToDTO(e, userA, userB, entity)).ToList();
            return new UserDialogDto
            {
                Entries = entries,
                Receiver = entity.ReceiverId,
                Sender = sender.Id,
                SenderDescripton = entity.SenderDescription,
                SenderFullName = sender.FirstName + " " + sender.LastName,
                SenderFirstName = sender.FirstName,
                SenderImageUrl = sender.ImageUrl,
                LatestEntry = entries.LastOrDefault(e => e.SenderId == sender.Id)
            };
        }

    }
}