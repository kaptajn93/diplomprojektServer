using System;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using Newtonsoft.Json;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Configuration;
using System.Linq;
using BetterWays.Api.BoundedContexts.CoachingCourses.Infrastructure.Repositories;
using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Models;

namespace Tests
{
    [TestClass]
    public class CoachingCourseRepoTest
    {
        private static DocumentClient _client;
        private static Database _database;

        [ClassInitialize()]
        public static void ClassInit(TestContext context)
        {
            //Connect do documentdb account
            var endpoint = ConfigurationManager.AppSettings["endpoint"];
            var masterKey = ConfigurationManager.AppSettings["authKey"];
            var dbName = ConfigurationManager.AppSettings["database"];

            _client = new DocumentClient(new Uri(endpoint), masterKey);

            /*------ Get a fresh database --------*/
            
            //Check if database has been created
            var databases = _client.CreateDatabaseQuery().Where(d => d.Id == dbName).ToList();

            //Delete any
            if (databases.Any())
            {
                foreach (var database in databases)
                {
                    _client.DeleteDatabaseAsync(database.SelfLink);
                }
            }
        }
        
        [TestMethod]
        public void CreateAndFindNewCourse()
        {
            var courseName = "Test coaching course";
            var courseRepo = new CoachingCourseRepositoryDocumentDB();
            var course = new CoachingCourse(courseName);
            courseRepo.CreateCoachingCourse(course);

            courseRepo.SaveCoachingCourse(course);

            courseRepo = new CoachingCourseRepositoryDocumentDB();
            var foundCourses = courseRepo.GetItems(c => c.Name == courseName).Single();
            
            Assert.IsNotNull(foundCourses);
        }

        [TestMethod]
        public void AddModuleToCourse()
        {
            var courseName = "Course with modules";
            var courseRepo = new CoachingCourseRepositoryDocumentDB();
            var course = new CoachingCourse(courseName);
            courseRepo.CreateCoachingCourse(course);

            //courseRepo.SaveCoachingCourse(course);

            var introduction = new CoachingModuleResource() { RevisionHistory = new ResourseRevisionHistoryReference(), Content = "<h1>&lt;Overskrift her&gt;</h1> <p>&lt;Kort tekst her&gt;</p> <div data-oembed-url='https://vimeo.com/ricardonilsson/coachingwill'> <div style='left: 0px; width: 100%; height: 0px; position: relative; padding-bottom: 56.2493%;'><iframe allowfullscreen='true' frameborder='0' mozallowfullscreen='true' src='//player.vimeo.com/video/77308630?byline=0&amp;badge=0&amp;portrait=0&amp;title=0' style='top: 0px; left: 0px; width: 100%; height: 100%; position: absolute;' webkitallowfullscreen='true'></iframe></div> </div> <h2>&lt;Overskrift, start p&aring; udvidet intro&gt;</h2> <p>&lt;Intro her&gt;</p> <h2>&lt;Overskrift, eksterne henvisninger&gt;</h2> <p><a href='http://wikipedia.org'>&lt;Eksempel p&aring; link&gt;</a></p>" };
            var exercise = new CoachingModuleResource() { RevisionHistory = new ResourseRevisionHistoryReference(), Content = "<h1>&lt;Overskrift her&gt;</h1> <p>&lt;Kort tekst her&gt;</p> <div data-oembed-url='https://vimeo.com/ricardonilsson/coachingwill'> <div style='left: 0px; width: 100%; height: 0px; position: relative; padding-bottom: 56.2493%;'><iframe allowfullscreen='true' frameborder='0' mozallowfullscreen='true' src='//player.vimeo.com/video/77308630?byline=0&amp;badge=0&amp;portrait=0&amp;title=0' style='top: 0px; left: 0px; width: 100%; height: 100%; position: absolute;' webkitallowfullscreen='true'></iframe></div> </div> <h2>&lt;Overskrift, start p&aring; udvidet intro&gt;</h2> <p>&lt;Intro her&gt;</p> <h2>&lt;Overskrift, eksterne henvisninger&gt;</h2> <p><a href='http://wikipedia.org'>&lt;Eksempel p&aring; link&gt;</a></p>" };
            var reflection = new CoachingModuleResource() { RevisionHistory = new ResourseRevisionHistoryReference(), Content = "<h1>&lt;Overskrift her&gt;</h1> <p>&lt;Kort tekst her&gt;</p> <div data-oembed-url='https://vimeo.com/ricardonilsson/coachingwill'> <div style='left: 0px; width: 100%; height: 0px; position: relative; padding-bottom: 56.2493%;'><iframe allowfullscreen='true' frameborder='0' mozallowfullscreen='true' src='//player.vimeo.com/video/77308630?byline=0&amp;badge=0&amp;portrait=0&amp;title=0' style='top: 0px; left: 0px; width: 100%; height: 100%; position: absolute;' webkitallowfullscreen='true'></iframe></div> </div> <h2>&lt;Overskrift, start p&aring; udvidet intro&gt;</h2> <p>&lt;Intro her&gt;</p> <h2>&lt;Overskrift, eksterne henvisninger&gt;</h2> <p><a href='http://wikipedia.org'>&lt;Eksempel p&aring; link&gt;</a></p>" };

            var module = course.AddCoachingModule("My coaching module", introduction, exercise, reflection);
            courseRepo.SaveCoachingCourse(course);

            courseRepo = new CoachingCourseRepositoryDocumentDB();
            var foundCourses = courseRepo.GetItems(c => c.Name == courseName).Single();

            Assert.IsNotNull(foundCourses);
        }
    }
}
