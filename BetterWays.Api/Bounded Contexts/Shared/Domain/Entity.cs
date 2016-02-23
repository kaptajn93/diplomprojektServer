using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BetterWays.Api.BoundedContexts.Shared.Domain
{
    public abstract class Entity 
    {
        /// <summary>
        /// Identifier of this identity
        /// </summary>
        [JsonProperty(PropertyName = "id")]
        public Guid Id { get; private set; }

        public Entity()
        {
            Id = Guid.NewGuid();
        }

    }
}
