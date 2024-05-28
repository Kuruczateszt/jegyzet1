using System;
using System.Collections.Generic;

namespace foglalasok.Models
{
    public partial class Vendegek
    {
        public Vendegek()
        {
            Foglalasoks = new HashSet<Foglalasok>();
        }

        public int Vsorsz { get; set; }
        public string Vnev { get; set; } = null!;
        public int Irsz { get; set; }

        public virtual ICollection<Foglalasok> Foglalasoks { get; set; }
    }
}
