using celloveszetCLI;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace lovesekWPF
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public ObservableCollection<Cellovo> OsszesCellovo { get; set; } = new ObservableCollection<Cellovo>();
        public MainWindow()
        {
            InitializeComponent();

            using (var file = new StreamReader("lovesek.csv"))
            {
                string? sor;
                while ((sor = file.ReadLine()) != null)
                {
                    OsszesCellovo.Add(new Cellovo(sor));
                }
            }

            //Jelenítse meg DataGrid - on a fájlban lévő céllövők adatait!(1pont)
            Tablazat1.ItemsSource = OsszesCellovo;
            

            
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {

            var mezok = new List<string>()
            {
                Loves1.Text,
                Loves2.Text,
                Loves3.Text,
                Loves4.Text
            };

            var talalatok = new List<int>();

            foreach (var t in mezok)
            {
                int szam;
                if(int.TryParse(t, out szam))
                {
                    talalatok.Add(szam);
                }
            }

            if (Nev.Text == "" || talalatok.Count() != 4 || !talalatok.All(t => t >= 1 && t <= 99))
            {
                MessageBox.Show("Nem megfelelő értékek");
                return;
            }

            OsszesCellovo.Add(new Cellovo(Nev.Text, talalatok));


        }

        private void Loves3_TextChanged(object sender, TextChangedEventArgs e)
        {

        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            using (var file = new StreamWriter("lovesek2.csv"))
            {
                foreach (var cellovo in OsszesCellovo)
                {
                    file.WriteLine(cellovo.CsvBe());
                }
            }
            if (File.Exists("lovesek2.csv"))
            {
                MessageBox.Show("A mentés sikeresen megtörtént");
            }
        }
    }
}
