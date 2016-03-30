using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.User;
using BetterWays.Api.BoundedContexts.Shared.Infrastructure;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Repositories
{
    public class UserRepositoryDocumentDB : DocumentDBRepository<User>, IUserRepository
    {
        public void CreateUser(User user)
        {
            var document = CreateItemAsync(user);
        }

        public User GetUserById(Guid id)
        {
            return GetItems(i => i.Id == id).Single();
        }

        public void SaveUser(User user)
        {
            SaveItem(user);
        }
    }
}