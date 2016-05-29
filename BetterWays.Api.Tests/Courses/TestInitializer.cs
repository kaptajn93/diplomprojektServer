using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BetterWays.Api.Tests.Courses
{
    [TestClass]
    public class TestInitializer
    {
        [AssemblyInitialize]
        public static void AssemblyInit(TestContext context)
        {
            var jsonSerilizerSettings = new JsonSerializerSettings();

            jsonSerilizerSettings.TypeNameHandling = TypeNameHandling.Auto;
            jsonSerilizerSettings.TypeNameAssemblyFormat = System.Runtime.Serialization.Formatters.FormatterAssemblyStyle.Simple;

            JsonConvert.DefaultSettings = () =>
            {
                return jsonSerilizerSettings;
            };
        }
    }
}
