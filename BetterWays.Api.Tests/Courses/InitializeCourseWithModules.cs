using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Repositories;
using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Models;
using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Services;
using BetterWays.Api.BoundedContexts.CoachingCourses.Infrastructure.Repositories;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BetterWays.Api.Tests.Courses
{
    [TestClass]
    public class InitializeCourseWithModules
    {
        private static DocumentClient _client;
        private static Database _database;
        private static CoachingCourseService _coachingCourseService;

        [ClassInitialize()]
        public static void ClassInit(TestContext context)
        {
            //Connect do documentdb account
            var endpoint = ConfigurationManager.AppSettings["endpoint"];
            var masterKey = ConfigurationManager.AppSettings["authKey"];
            var dbName = ConfigurationManager.AppSettings["database"];

            _client = new DocumentClient(new Uri(endpoint), masterKey);
            
            //Check if database has been created
            var databases = _client.CreateDatabaseQuery().Where(d => d.Id == dbName).ToList();

            //Delete any
            /*if (databases.Any())
            {
                foreach (var database in databases)
                {
                    _client.DeleteDatabaseAsync(database.SelfLink);
                }
            }*/

            _coachingCourseService = new CoachingCourseService(
                new CoachingCourseRepositoryDocumentDB(),
                new ModuleResourceRepositoryDocumentDb(),
                new CoachingModuleRepositoryDocumentDB(),
                new CoachnigModuleExerciseResourceRepositoryDocumentDB(),
                new UserRepositoryDocumentDB());
        }

        [TestMethod]
        public void InitCourseWithModules()
        {
            var moduleRepo = new CoachingModuleRepositoryDocumentDB();
            var courseName = "Better ways course";
            //Create the course
            var course = _coachingCourseService.CreateNewCoachingCourse(courseName);

            var mod1 = _coachingCourseService.CreateNewModuleInCourse(course, "Fyret. Hvad nu?", 0);
            Assert.IsNotNull(mod1.Exercise);

            mod1.Description = "Find det positive i dit seneste job, og undgå negativiteten. Se fremad, mod nye udfordringer.";
            _coachingCourseService.UpdateModuleResurce(
                mod1,
                new CoachingModuleExerciseResource() { Elements = new List<ResourceExerciseElement>(){
                    new ResourceExerciseElement("") {
                        Exercise = new GoalExercise(new CoachingModuleReference(mod1.Id))
                    },
                    new ResourceExerciseElement("<h1>Glæden i dit seneste arbejde</h1>  <p>Jeg vil bede dig om at se tilbage på dit seneste arbejde og arbejdsplads: Hvad der betød mest for dig?</p> ") {
                        Exercise = new SortAndEvaluateExercise(
                            new List<string>() { "Mening", "Chef", "Indfldelse", "Resultater", "Kollegaer", "Balance" },
                            new CoachingModuleReference(mod1.Id)) {
                                Description = "Find det positive",
                                InstrunctionContent = new List<string> {
                                    "<p>Når du er klar skal du trykke, 'Start øvelse':</p>",
                                    "<p>Jeg vil bede dig om at se tilbage på dit seneste arbejde og arbejdsplads: Hvad der betød mest for dig? Det mest betydningsfulde skal du placere øverst, og det mindst betydningsfulde nederst. Tryk 'færdig' når du er klar.</p>",
                                    "<p>Der har været en hel række af begivenheder, situationer og hændelser som du husker tilbage på med forskellige følelser.</p><p>Jeg vil bede dig om at kigge tilbage på de oplevelser du har haft med [dine prioiteringer] – OG særlige oplevelser der har fyldt dig med glæde. Vær opmærksom på at her skal du kun gå i detaljer med det der har en positiv indvirken på dig.</p><p>Det andet vil jeg bede dig om at lade ligge som blot en konstatering – at der var situationer som ikke gik din vej. Dyrk det der fungerer for dig og lær hvordan du kan øge lige præcist det der styrker dig.</p>",
                                    "<p>Fortæl om en positiv oplevelse vedrørende din(e)</p>",
                                    "<h2>Øvelsen er færdig</h2><p>Her er din besvarelse, sorteret med det mest betydningsfulde, først:</p>"
                                }
                            }
                    } },
                    RevisionHistory = new ResourseRevisionHistoryReference() { ReferenceId = mod1.Exercise.RevisionHistoryReferenceId }
                });
              
            var mod2 = _coachingCourseService.CreateNewModuleInCourse(course, "Læg en plan og hold den", 1);
            mod2.Description = "Planlægning kan hjælpe dig med at komme videre. Start med at lægge en plan for den nærmeste fremtid.";
            _coachingCourseService.UpdateModuleResurce(
                mod2,
                new CoachingModuleExerciseResource()
                {
                    Elements = new List<ResourceExerciseElement>(){
                    new ResourceExerciseElement("") {
                        Exercise = new GoalExercise(new CoachingModuleReference(mod2.Id))
                        
                    },
                    new ResourceExerciseElement("<h1>Personlighedstest fra KP explorer</h1> <p>Denne øvelse skal give dig et overblik over din personlige profil. </p> <h3>Guide</h3> <p>Prøv at læse de præsenterede udsagn, således at du besvarer dem så spontant som muligt. Følg så vidt muligt din første indskydelse.<br/>Brug maksimalt 40 minutter på hele besvarelsen, og undgå så vidt muligt at holde pauser.</p> ") {
                        Exercise = new KPExplorerQuestionnaire(
                            new List<string>() {
                                "Jeg trives med at være den, man lægger mærke til",
                                "Vanskelige beslutninger bør man afklare i fællesskab",
                                "Hvis indflydelse kræver hensynsløshed, så er jeg hellere fri",
                                "Mit liv er i høj grad bestemt af de overordnede mål, jeg arbejder for",
                                "Jeg bryder mig ikke om irrationelle begrundelser",
                                "Jeg lægger mere vægt på livet her og nu end på fjerne mål",
                                "Jeg trives med skiftende arbejdsopgaver",
                                "Det kan være meget godt med analyse og logik, men ofte er intuition det vigtigste",
                                "Undertiden brænder jeg inde med mine synspunkter i en diskussion",
                                "Der er mange ting, jeg holder for mig selv",
                                "Når jeg har for meget at lave, bliver jeg let irritabel",
                                "Jeg kan godt lide at tage lidt gas på mine kolleger",
                                "Jeg lytter til mine umiddelbare sanser og følelserog ikke kun til mit hoved",
                                "Folk vurderer mig som lidt af en 'lommepsykolog'",
                                "Jeg kan ikke lide at blive afbrudt i mit arbejde",
                                "Jeg har let ved at opnå og fastholde andres opmærksomhed",
                                "Jeg prøver at have det sjovt uanset situationen",
                                "Jeg er altid meget opmærksom på, hvordan andre har det",
                                "Nogle vil nok sige, at jeg undertiden handler overilet",
                                "Jeg tror mere på min forstand end på mine følelsesmæssige fornemmelser",
                                "Jeg bryder mig ikke om at indvie andre i mine tanker og følelser",
                                "Når jeg skal finde en løsning, lytter jeg først og fremmest til min intuition",
                                "Problemløsning opfatter jeg som en intellektuel udfordring",
                                "Det ligger ikke til mig at være for udfordrende i kontroversielle spørgsmål",
                                "Det er ofte lettere at lave et stykke arbejde selv, i stedet for at give det videre",
                                "Andre finder mig nok lidt traditionsbunden",
                                "Hvis ikke jeg følger mit eget arbejdstempo, bliver jeg stresset",
                                "Jeg har aldrig for travlt til at lave sjov",
                                "Jeg er ivrig tilhænger af demokratiske beslutningsprocesser",
                                "Jeg har det bedst med at arbejde i det stille",
                                "Hellere tænke sig om en gang for meget end en gang for lidt",
                                "Det er vigtigt for mig at fastholde en langsigtet plan",
                                "Jeg er mere optaget af de aktuelle opgaver end af fremtiden",
                                "At lytte til andre er godt, men det kan let tage overhånd",
                                "Jeg er modstander af at igangsætte overilede initiativer",
                                "Min vigtigste rådgiver er mig selv",
                                "En kompliceret situation kræver snarere intuitiv forståelse end logisk analyse",
                                "Perioder med forceret arbejdspres er opslidende",
                                "Undertiden har jeg lidt svært ved at forstå andres bevæggrunde",
                                "Det meget følelsesbetonede holder jeg gerne på afstand",
                                "Man bliver stresset, hvis tingene forandres hele tiden",
                                "Hvis man hele tiden laver tingene om, ender man i kaos",
                                "Jeg kan ikke acceptere, når mine omgivelser presser mig til en for stor arbejdsbyrde",
                                "Jeg har mere respekt for facts end for følelser",
                                "Når jeg har delegeret arbejdsopgaver, er jeg aldrig helt tryg, før de er fuldført",
                                "De fleste har en vis respekt for min logiske sans",
                                "Jokes og morsomheder på arbejdet fjerner fokus og er forstyrrende",
                                "I et nyt selskab er jeg lidt reserveret i starten",
                                "Folk, der tænker meget analytisk, mangler ofte praktisk sans",
                                "Jeg er en ret usentimental type",
                                "Lige fra barnsben har det været mig, der var den naturlige leder i en gruppe",
                                "Hvis et projekt skal have alle detaljer afklaret, kommer det aldrig i gang",
                                "Store følelser er ikke lige min sag",
                                "Jeg finder det upassende at lave sjov med mine kolleger",
                                "Saglighed er vigtigere end forståelse, når man skal tackle andres problemer",
                                "Det er ikke mig at tage beslutninger i ensom majestæt",
                                "I diskussioner har jeg let ved at komme igennem med mine synspunkter",
                                "Folk, der griner meget på deres arbejde, bestiller generelt for lidt",
                                "I en forsamling har jeg let ved at fremføre mine synspunkter",
                                "Det er let for mig at skabe følelsesmæssige relationer til andre",
                                "Det irriterer mig, når et projekt bliver søsat, før det er rigtigt gennemtænkt",
                                "Selv i perioder med hårdt arbejdspres er jeg i stand til at slappe af",
                                "Folk, der påberåber sig deres intuition, er vanskelige at diskutere med",
                                "Jeg vil helst føre an i en gruppe",
                                "Jeg bryder mig ikke om at være i rampelyset",
                                "Jeg kan finde en morsom vinkel på selv den kedeligste arbejdsopgave",
                                "En af mine stærke sider er evnen til at delegere en større opgave",
                                "Jeg er en type, man har let ved at betro sig til",
                                "Jeg vil hellere have en stille aften end at gå til selskab",
                                "Jeg er snarere en 'praktisk gris' end en 'intellektuel ørn'",
                                "Når problemer skal drøftes, er jeg ofte lidt tilbageholdende i starten",
                                "Når jeg har sat mig en målsætning, slipper jeg den nødigt",
                                "Jeg har let ved at tale til store forsamlinger",
                                "Der er en overdreven tendens i tiden til psykologisering",
                                "Når jeg har en stor opgave, fordeler jeg den hurtigt videre",
                                "Jeg er nok tilbøjelig til at lytte mere til mig selv end til andre",
                                "Man kommer længst med rationel analyse",
                                "Hver gang jeg sætter mig et mål, udvikler jeg omhyggeligt en strategi",
                                "Jeg bryder mig ikke om 'føleri'",
                                "Jeg møder udfordringerne en af gangen og tager ikke sorgerne på forskud",
                                "Når noget skal gennemføres, er der ingen grund til lange overvejelser",
                                "Jeg synes, at det kan være svært at vurdere, hvornår en opgave skal delegeres",
                                "En arbejdsplads er et seriøst sted, hvor der ikke er tid til pjat",
                                "Jeg har svært ved at slippe en opgave, selvom den kan videregives til andre",
                                "Jeg lider ikke af nostalgi over for de svundne tider",
                                "Det burde ikke være nødvendigt at slå på tromme for sig selv", },
                            new CoachingModuleReference(mod2.Id)) {
                                Description = "Find din personlige profil",
                                InstrunctionContent = new List<string>() {
                                    "<p>Når du er klar skal du trykke, 'Start øvelse':</p>",
                                    "<h2>Øvelsen er færdig</h2><p>Din coach vil snart sende dig resultatet</p>"
                                
                                } 
                            }
                    } },
                    RevisionHistory = new ResourseRevisionHistoryReference() { ReferenceId = mod2.Exercise.RevisionHistoryReferenceId }
                });

            _coachingCourseService.CreateNewModuleInCourse(course, "Successhistorier", 2);
            _coachingCourseService.CreateNewModuleInCourse(course, "Dit talent", 3);
            _coachingCourseService.CreateNewModuleInCourse(course, "Dine personlige kompetencer", 4);
            _coachingCourseService.CreateNewModuleInCourse(course, "Motivation", 5);

            _coachingCourseService.CreateNewModuleInCourse(course, "Linkedin profil", 6);
            _coachingCourseService.CreateNewModuleInCourse(course, "Mulighederne - dig og din nye arbejdsplads", 7);
            _coachingCourseService.CreateNewModuleInCourse(course, "Netværk og social kapital", 8);
            _coachingCourseService.CreateNewModuleInCourse(course, "Nettet", 9);
            _coachingCourseService.CreateNewModuleInCourse(course, "Massiv indsats - hit med jobbet", 10);
            _coachingCourseService.CreateNewModuleInCourse(course, "Jobtilbud / jobafslag", 11);


        }
    }
}
