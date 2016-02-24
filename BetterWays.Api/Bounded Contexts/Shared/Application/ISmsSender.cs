namespace BetterWays.Api.Bounded_Contexts.Shared.Application
{
    public interface ISmsSender
    {
        void SendSms(string receiver, string content);
    }
}
