using System;
using BetterWays.Api.Bounded_Contexts.Shared.Application;
using Plivo.API;
using System.Collections.Generic;

namespace BetterWays.Api.Bounded_Contexts.Shared.Infrastructure
{
    public class SmsSenderPlivo : ISmsSender
    {
        // Find your Account Sid and Auth Token at twilio.com/user/account
        private string _authId;
        private string _authToken;

        public SmsSenderPlivo(string authId, string authToken)
        {
            _authId = authId;
            _authToken = authToken;
        }

        public void SendSms(string receiver, string content)
        {
            var client = new RestAPI(_authId, _authToken);

            var response = client.send_message(new Dictionary<string, string>()
            {
                { "src", /*"14155690571"*/"BetterWays" }, // Senders phone number with country code
                { "dst", "4553747204" }, // Receivers phone number wiht country code
                { "text", "Hello from BetterWays Unit Test." }, // Your SMS text message
                //{ "url", "http://dotnettest.apphb.com/delivery_report"}, // The URL to which with the status of the message is sent
                { "method", "POST"} // Method to invoke the url
            });

            //Prints the message details
            Console.Write(response.Content);

            // Print the message_uuid
            Console.WriteLine(response.Data.message_uuid[0]);

            // Print the api_id
            Console.WriteLine(response.Data.api_id);
        }
    }
}