using System;
using System.Collections.Generic;

namespace foglalasok.Models
{
    public partial class Szobak
    {
        public Szobak()
        {
            Foglalasoks = new HashSet<Foglalasok>();
        }

        public int Szazon { get; set; }
        public string Sznev { get; set; } = null!;
        public int Agy { get; set; }
        public int Potagy { get; set; }

        public virtual ICollection<Foglalasok> Foglalasoks { get; set; }
    }
}
