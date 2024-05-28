namespace celloveszetCLI
{
    public class Cellovo
    {
        public string Nev { get; private set; } = string.Empty;
        public int elsoloves { get; private set; }
        public int masodikloves { get; private set; }
        public int harmadikloves { get; private set; }
        public int negyedikloves { get; private set; }

        public Cellovo()
        {
            
        }
        public Cellovo(string sor)
        {
            var adatok = sor.Split(";");
            //nem teszteljük hány darab, elfogadjuk hogy 5
            this.Nev = adatok[0];
            this.elsoloves = Convert.ToInt32(adatok[1]);
            this.masodikloves = Convert.ToInt32(adatok[2]);
            this.harmadikloves = Convert.ToInt32(adatok[3]);
            this.negyedikloves = Convert.ToInt32(adatok[4]);
        }
        //wpf feladathoz. Ott ellenőrzött értékeket használok
        public Cellovo(string nev, List<int> talalatok)
        {
            this.Nev = nev;
            this.elsoloves = talalatok[0];
            this.masodikloves = talalatok[1];
            this.harmadikloves = talalatok[2];
            this.negyedikloves = talalatok[3];
        }
        public override string ToString()
        {
            return $"Céllövő neve: {this.Nev}, lövés1: {this.elsoloves}, lövés2: {this.masodikloves}, Lövés3: {this.harmadikloves}, Lövés4: {this.negyedikloves}";
        }
        public int LegnagyobbLoves()
        {
            var lovesek = new List<int>(){
                elsoloves, masodikloves , harmadikloves , negyedikloves
            };
            return lovesek.Max();
        }
        public string NevEsLegjobbLoves()
        {
            return $"Céllövő neve: {Nev},\t Legnabyobb pontszám: {LegnagyobbLoves()}";
        }
        public int atlag()
        {
            var lovesek = new List<int>(){
                elsoloves, masodikloves , harmadikloves , negyedikloves
            };
            //int -et kér a feladat
            return ((int)lovesek.Average());
        }
        //wpf feladathoz
        public string CsvBe()
        {
            return $"{this.Nev};{this.elsoloves};{this.masodikloves};{this.harmadikloves};{this.negyedikloves}";
        }
        
    }
    internal class Program
    {
        static void Main(string[] args)
        {
            var OsszesCellovo = new List<Cellovo>();
            using (var file = new StreamReader("lovesek.csv"))
            {
                string? sor;
                while ((sor = file.ReadLine()) != null)
                {
                    OsszesCellovo.Add(new Cellovo(sor));
                }
            }

                //9. A függvényt felhasználva jelenítse meg a játékosok neveit és azok legnagyobb                pontszámát!
                foreach (var cellovo in OsszesCellovo)
                {
                    Console.WriteLine(cellovo.NevEsLegjobbLoves());
                }
                //10. A program jelenítse meg annak a céllövőnek a nevét és lövéseit akié a legjobb lövés, azaz a legnagyobb pontszámot lőtte a versenyen!

                var legjobbjatekos = OsszesCellovo.OrderByDescending(c => c.LegnagyobbLoves()).First();
                Console.WriteLine($"\nA legjobb találatot lövő eredményei:\n{legjobbjatekos.elsoloves} {legjobbjatekos.masodikloves} {legjobbjatekos.harmadikloves} {legjobbjatekos.negyedikloves}");


                //11. A program jelenítse meg a leggyengébb átlagú lövő nevét és az átlagát!
                var legGyengebbAtlag = OsszesCellovo.OrderBy(c => c.atlag()).First();
                Console.WriteLine($"\nA leggyengébb átlagú találatot lövő eredményei:\n{legGyengebbAtlag.Nev} {legGyengebbAtlag.atlag()}");
        }
    }
}