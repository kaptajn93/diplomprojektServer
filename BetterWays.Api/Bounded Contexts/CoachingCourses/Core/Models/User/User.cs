using BetterWays.Api.BoundedContexts.Shared.Domain;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.User
{
    public class User : AggregateRoot
    {
        [JsonProperty(PropertyName = "userId")]
        public string UserId { get; set; }
        [JsonProperty(PropertyName = "firstName")]
        public string FirstName { get; set; }
        [JsonProperty(PropertyName = "lastName")]
        public string LastName { get; set; }

        [JsonProperty(PropertyName = "password")]
        public string Password { get; set; }

        [JsonProperty(PropertyName = "facebookId")]
        public string FacebookId { get; set; }

        [JsonProperty(PropertyName = "courseAdmissions")]
        public List<UserCourseAdmission> CourseAdmissions { get; set; }

        [JsonProperty(PropertyName = "roles")]
        public List<string> Roles { get; set; }

        [JsonProperty(PropertyName = "coachId")]
        public Guid? CoachId { get; set; }

        [JsonProperty(PropertyName = "imageUrl")]
        public string ImageUrl { get; set; }

        public User()
        {
            Roles = new List<string>();
        }
    }
}