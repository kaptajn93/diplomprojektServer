using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Repositories
{
    public interface IDialogRepository
    {
        IEnumerable<UserDialog> GetDialogFromUsers(Guid userA, Guid userB);
        IEnumerable<UserDialog> GetUserReceivedDialogs(Guid userId);
        void SaveDialog(UserDialog dialog);
        void DeleteDialog(UserDialog dialog);
        UserDialog GetOppositeDialog(UserDialog dialog);
    }
}
