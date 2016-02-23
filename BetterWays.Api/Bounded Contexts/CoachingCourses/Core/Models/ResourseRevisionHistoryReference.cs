using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BetterWays.Api.BoundedContexts.CoachingCourses.Core.Models
{
    public class ResourseRevisionHistoryReference
    {
        /// <summary>
        /// Reference to id of its revision history
        /// </summary>
        [JsonProperty(PropertyName = "referenceId")]
        public Guid ReferenceId { get; set; }
    }
}
