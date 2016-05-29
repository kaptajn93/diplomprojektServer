using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.User;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Repositories;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Requests;
using JWT;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Controllers
{
    public class AuthenticationController : ApiController
    {
        [AllowAnonymous]
        [Route("api/login")]
        [HttpPost]
        public HttpResponseMessage Login(LoginRequest model)
        {
            HttpResponseMessage response = null;
            if (ModelState.IsValid)
            {
                var userRepo = new UserRepositoryDocumentDB();

                var existingUser = userRepo.GetItems(u => u.UserId == model.UserId).SingleOrDefault();

                if (existingUser == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.NotFound);
                }
                else
                {
                    var loginSuccess =
                        string.Equals(model.Password,
                            existingUser.Password);

                    if (loginSuccess)
                    {
                        object user;
                        var token = CreateToken(existingUser, out user);
                        response = Request.CreateResponse(new { token, user });
                    }
                }
            }
            else
            {
                response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            return response;
        }

        /// <summary>
        /// Create a Jwt with user information
        /// </summary>
        /// <param name="user"></param>
        /// <param name="dbUser"></param>
        /// <returns></returns>
        private static string CreateToken(User user, out object dbUser)
        {
            var unixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            var expiry = Math.Round((DateTime.UtcNow.AddHours(2) - unixEpoch).TotalSeconds);
            var issuedAt = Math.Round((DateTime.UtcNow - unixEpoch).TotalSeconds);
            var notBefore = Math.Round((DateTime.UtcNow.AddMonths(6) - unixEpoch).TotalSeconds);


            var payload = new Dictionary<string, object>
            {
                {"userId", user.Id},
                {"role", user.Roles.Count > 0 ? user.Roles.First(): ""  }, //TODO: Add support for multiple roles
                {"sub", user.Id},
                {"nbf", notBefore},
                {"iat", issuedAt},
                //{"exp", expiry}
            };

            

            //var secret = ConfigurationManager.AppSettings.Get("jwtKey");
            const string apikey = "secretKey";

            var token = JsonWebToken.Encode(payload, apikey, JwtHashAlgorithm.HS256);

            dbUser = new { id = user.Id, roles = user.Roles, firstName = user.FirstName, lastName = user.LastName, imageUrl = user.ImageUrl };
            return token;
        }
    }
}