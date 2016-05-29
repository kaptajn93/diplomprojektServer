namespace BetterWays.Api.Bounded_Contexts.Shared.Application
{
    public interface IEmailSender
    {
        void SendEmail(string receiver, object content);
    }
}
