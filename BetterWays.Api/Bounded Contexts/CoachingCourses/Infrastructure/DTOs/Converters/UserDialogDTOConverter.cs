using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs.Converters
{
    public static class UserDialogDTOConverter
    {
        public static DialogEntryDTO ConvertToDTO(DialogEntry entity, User userA, User userB)
        {
            var user = entity.SenderId == userA.Id ? userA : entity.SenderId == userB.Id ? userB : null;

            if (user == null)
                throw new Exception("Unexected user in dialog entry");

            return new DialogEntryDTO()
            {
                SenderImgageUrl = "",
                SenderName = user.FirstName + " " + user.LastName,
                Text = entity.Text,
                TimeStamp = entity.TimeStamp
            };
        }

        public static UserDialogDto ConvertToDTO(UserDialog entity, User userA, User userB) {
            var receiver = entity.ReceiverId == userA.Id ? userA : entity.ReceiverId == userB.Id ? userB : null;

            return new UserDialogDto
            {
                Entries = entity.Entries.Select(e => ConvertToDTO(e, userA, userB)).ToList(),
                Receiver = entity.ReceiverId,
                ReceiverDescripton = entity.ReceiverDescription,
                ReceiverFullName = receiver.FirstName + " " + receiver.LastName
            };
        }

    }
}