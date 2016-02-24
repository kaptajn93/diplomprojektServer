using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using BetterWays.Api.Bounded_Contexts.Shared.Infrastructure;

namespace BetterWays.Api.Tests.Shared.Unit
{
    [TestClass]
    public class SmsSenderTests
    {
        [TestMethod]
        public void CanSendSms()
        {
            // ARRANGE
            var authId = "MAMZG2OGU1ZJZIZDC0ZW";
            var authToken = "MDhiMWI5Y2U2ZTRjZTdkODFjOTQzNTY3YTk5OGVk";

            var smsSender = new SmsSenderPlivo(authId, authToken);

            // ACT
            // This will charge MIHs personal account, so please use with care :)
            //smsSender.SendSms("+4553747204", "Hello from BetterWays Unit Test.");

            // ASSERT
        }
    }
}
