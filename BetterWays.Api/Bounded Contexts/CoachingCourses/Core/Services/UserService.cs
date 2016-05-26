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
        private IDialogRepository _dialogRepository;

        public UserService(
            IUserRepository userRepository, IDialogRepository dialogRepository)
        {
            _userRepository = userRepository;
            _dialogRepository = dialogRepository;
        }

        public User CreateUser(string userId, string firstName, string lastName, string password, string email, List<string> roles, Guid? coachId)
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
                Roles = roles,
                CoachId = coachId
            };
            
            if (coachId != null)
            {
                //Create dialog
                var dialogService = new DialogService(_dialogRepository);
                dialogService.InitiateDialog(usr.Id, coachId.Value, "", "Din coach");
                
                //Send a message
                var dialogEntry = dialogService.Post(
                    coachId.Value, 
                    usr.Id, 
                    "Hej " + firstName + ". Jeg er din coach og er til rådighed her på chatten. Skriv til mig hvis du har spørgsmål. Jeg glæder mig til at høre fra dig."
                    );

            }

            _userRepository.CreateUser(usr);
            return usr;
        }
    }
}