using BetterWays.Api.BoundedContexts.Shared.Domain;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BetterWays.Api.BoundedContexts.Shared.Infrastructure
{
    public class DocumentDBRepository<T>  where T : Entity
    {
        //Use the Database if it exists, if not create a new Database
        private Database ReadOrCreateDatabase()
        {
            var db = Client.CreateDatabaseQuery()
                            .Where(d => d.Id == DatabaseId)
                            .AsEnumerable()
                            .FirstOrDefault();

            if (db == null)
            {
                db = Client.CreateDatabaseAsync(new Database { Id = DatabaseId }).Result;
            }

            return db;
        }

        //Use the DocumentCollection if it exists, if not create a new Collection
        private DocumentCollection ReadOrCreateCollection(string databaseLink)
        {
            DocumentCollection col = null;
            col = Client.CreateDocumentCollectionQuery(databaseLink)
                              .Where(c => c.Id == CollectionId)
                              .AsEnumerable()
                              .FirstOrDefault();
            if (col == null)
            {
                var collectionSpec = new DocumentCollection { Id = CollectionId };
                var requestOptions = new RequestOptions { OfferType = "S1" };

                col = Client.CreateDocumentCollectionAsync(databaseLink, collectionSpec, requestOptions).Result;
            }

            return col;
        }

        //Expose the "database" value from configuration as a property for internal use
        private string _databaseId;
        private string DatabaseId
        {
            get
            {
                if (string.IsNullOrEmpty(_databaseId))
                {
                    _databaseId = ConfigurationManager.AppSettings["database"];
                }

                return _databaseId;
            }
        }

        //Expose the "collection" value from configuration as a property for internal use
        private string _collectionId;
        private string CollectionId
        {
            get
            {
                if (string.IsNullOrEmpty(_collectionId))
                {
                    _collectionId = ConfigurationManager.AppSettings["collection"]; //typeof(T).Name;
                }

                return _collectionId;
            }
        }

        //Use the ReadOrCreateDatabase function to get a reference to the database.
        private Database _database;
        private Database Database
        {
            get
            {
                if (_database == null)
                {
                    _database = ReadOrCreateDatabase();
                }

                return _database;
            }
        }

        //Use the ReadOrCreateCollection function to get a reference to the collection.
        private DocumentCollection _collection;
        public DocumentCollection Collection
        {
            get
            {
                if (_collection == null)
                {
                    _collection = ReadOrCreateCollection(Database.SelfLink);
                }

                return _collection;
            }
        }

        //This property establishes a new connection to DocumentDB the first time it is used, 
        //and then reuses this instance for the duration of the application avoiding the
        //overhead of instantiating a new instance of DocumentClient with each request
        private DocumentClient _client;
        public DocumentClient Client
        {
            get
            {
                if (_client == null)
                {
                    string endpoint = ConfigurationManager.AppSettings["endpoint"];
                    string authKey = ConfigurationManager.AppSettings["authKey"];
                    Uri endpointUri = new Uri(endpoint);
                    _client = new DocumentClient(endpointUri, authKey);
                }
                
                return _client;
            }
        }

        public IEnumerable<T> GetItems(Expression<Func<T, bool>> predicate)
        {
            var items = from i in Client.CreateDocumentQuery<T>(Collection.DocumentsLink).Where(predicate)
                        where i.TypeName == typeof(T).Name
                        select i;
            return items.AsEnumerable();
        }

        public IQueryable<T> GetItemsAsQueryable()
        {
            return from i in Client.CreateDocumentQuery<T>(Collection.DocumentsLink)
                        where i.TypeName == typeof(T).Name
                        select i;
        }

        public IEnumerable<T> GetItemsWithIds(IEnumerable<Guid> ids)
        {
            var items = from i in Client.CreateDocumentQuery<T>(Collection.DocumentsLink)
                        where i.TypeName == typeof(T).Name
                        where ids.Contains(i.Id)
                        select i;
            return items.AsEnumerable();
        }

        public IEnumerable<T> GetAllItems()
        {
            var items = from i in Client.CreateDocumentQuery<T>(Collection.DocumentsLink)
                        where i.TypeName == typeof(T).Name
                        select i;
            return items.AsEnumerable();
        }

        public Document CreateItemAsync(T item)
        {
            var document = Client.CreateDocumentAsync(Collection.SelfLink, item);
            document.Wait();
            return document.Result;
        }

        public Document SaveItem(T item)
        {
            var document = Client.UpsertDocumentAsync(Collection.SelfLink, item);
            document.Wait();
            return document.Result;
        }
    }
}
