using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.User;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Repositories;
using BetterWays.Api.BoundedContexts.Shared.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Repositories
{
    public class DialogRepositoryDocumentDb : DocumentDBRepository<UserDialog>, IDialogRepository
    {
        public IEnumerable<UserDialog> GetDialogFromUsers(Guid userA, Guid userB)
        {
            return GetItems(d =>
                (d.OwnerId == userA && d.ReceiverId == userB) ||
                (d.OwnerId == userB && d.ReceiverId == userA));
        }
        

        public IEnumerable<UserDialog> GetUserReceivedDialogs(Guid userId)
        {
            return GetItems(d => d.ReceiverId == userId);
        }

        public void SaveDialog(UserDialog dialog)
        {
            SaveItem(dialog);
        }

        public void DeleteDialog(UserDialog dialog)
        {
            base.DeleteItem(dialog);
        }

        public UserDialog GetOppositeDialog(UserDialog dialog)
        {
            return GetItems(d => d.OwnerId == dialog.ReceiverId && d.ReceiverId == dialog.OwnerId).Single();
        }

    }
}