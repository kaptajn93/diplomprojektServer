using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Repositories
{
    public interface IUserRepository
    {
        void CreateUser(User user);
        User GetUserById(Guid id);
        User GetUserByUserId(string userName);
        void SaveUser(User user);
    }
}
