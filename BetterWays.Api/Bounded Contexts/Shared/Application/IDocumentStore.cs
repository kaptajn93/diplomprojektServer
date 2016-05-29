namespace BetterWays.Api.Bounded_Contexts.Shared.Application
{
    public interface IDocumentStore
    {
        string StoreDocument(string tenantId, string filename, byte[] documentData);
    }
}
