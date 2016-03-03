using System;
using BetterWays.Api.Bounded_Contexts.Shared.Application;
using SendWithUs.Client;

namespace BetterWays.Api.Bounded_Contexts.Shared.Infrastructure
{
    public class EmailSenderSendWithUs : IEmailSender
    {
        // Find your Account Sid and Auth Token at twilio.com/user/account
        private string _apiKey;

        public EmailSenderSendWithUs(string apiKey)
        {
            _apiKey = apiKey;
        }

        public async void SendEmail(string receiver, object content)
        {
            var request = new SendRequest
            {
                TemplateId = "tem_LqNdYMYNxutJdjHzkEQyvT",
                SenderName = "BetterWays",
                SenderAddress = "no-reply@betterways.com",
                RecipientAddress = receiver,
                Data = content
            };

            var client = new SendWithUsClient(_apiKey);
            var response = await client.SendAsync(request);

            if (response.Success)
            {
                Console.WriteLine("Email Sent");
            }
            else
            {
                Console.WriteLine(response.ErrorMessage);
            }
        }
    }
}