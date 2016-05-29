using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BetterWays.Api.Bounded_Contexts.Shared.Infrastructure
{
    public class DocumentStoreAzureBlob
    {
        private CloudStorageAccount _storageAccount;
        private CloudBlobClient _cloudBlobClient;

        public DocumentStoreAzureBlob(string connectionString)
        {
            connectionString = "DefaultEndpointsProtocol=https;AccountName=fintechaalborg;AccountKey=SjGTCMSviaTVpczCIHa6YED955WBaJYJQRTyfxN35RR/PsDAqU8zQh53olCL7bYTD/J67/ZJbcfJn3LXdXa73w==;BlobEndpoint=https://fintechaalborg.blob.core.windows.net/;TableEndpoint=https://fintechaalborg.table.core.windows.net/;QueueEndpoint=https://fintechaalborg.queue.core.windows.net/;FileEndpoint=https://fintechaalborg.file.core.windows.net/";

            _storageAccount = CloudStorageAccount.Parse(connectionString);
            _cloudBlobClient = _storageAccount.CreateCloudBlobClient();
        }

        public string StoreDocument(string tenantId, string filename, byte[] documentData)
        {
            var container = GetOrCreateContainer(tenantId);

            // Retrieve reference to a blob.
            var blockBlob = container.GetBlockBlobReference(filename);

            // Create or overwrite the blob.
            blockBlob.UploadFromByteArray(documentData, 0, documentData.Length);

            return blockBlob.Uri.AbsoluteUri;
        }

        public List<Uri> GetDocumentUrls(string tenantId)
        {
            var container = GetOrCreateContainer(tenantId);

            var blobs = container.ListBlobs();

            return blobs.Select(b => b.Uri).ToList();
        }

        private CloudBlobContainer GetOrCreateContainer(string tenantId)
        {
            // Retrieve a reference to a container.
            CloudBlobContainer container = _cloudBlobClient.GetContainerReference(tenantId);

            // Create the container if it doesn't already exist.
            container.CreateIfNotExists();

            // Set permissions
            container.SetPermissions(
                new BlobContainerPermissions
                {
                    PublicAccess = BlobContainerPublicAccessType.Blob
                }
            );

            return container;
        }
    }
}