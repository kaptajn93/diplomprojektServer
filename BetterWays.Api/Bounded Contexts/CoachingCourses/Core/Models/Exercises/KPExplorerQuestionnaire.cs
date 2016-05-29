using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Core.Models.Exercises
{
    public class KPExplorerQuestionnaire : BaseExercise
    {
        [JsonProperty(PropertyName = "questions")]
        public List<string> Questions { get; set; }
        
        [JsonIgnore]
        public override string Configuration
        {
            get { return string.Join(";", Questions); }
        }

        public override BaseScoreCard GetEmptyScoreCard()
        {
            return new KPExplorerQuestionnaireScoreCard(Module, Id, Description);
        }
        public KPExplorerQuestionnaire(CoachingModuleReference module)
            : base(module, "KPExplorerQuestionnaire")
        {
            this.Questions = new List<string>() {
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
                                "Det burde ikke være nødvendigt at slå på tromme for sig selv", };
        }
    }
}