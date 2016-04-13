using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.User;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Services
{
    public class UserService
    {
        private IUserRepository _userRepository;

        public UserService(
            IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public User CreateUser(string userId, string firstName, string lastName, string password, string email, List<string> roles)
        {
            var existingUser = _userRepository.GetUserByUserId(userId);

            if (existingUser != null)
                throw new Exception(string.Format("User with username {0} already exists", userId));

            var usr = new User()
            {
                UserId = userId,
                FirstName = firstName,
                LastName = lastName,
                Password = password,
                Roles = roles
            };
            
            _userRepository.CreateUser(usr);
            return usr;
        }
    }
}