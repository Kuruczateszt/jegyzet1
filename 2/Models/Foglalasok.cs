using System;
using System.Collections.Generic;

namespace foglalasok.Models
{
    public partial class Foglalasok
    {
        public int Fsorsz { get; set; }
        public int Vendeg { get; set; }
        public int Szoba { get; set; }
        public DateTime Erk { get; set; }
        public DateTime Tav { get; set; }
        public int Fo { get; set; }

        public virtual Szobak SzobaNavigation { get; set; } = null!;
        public virtual Vendegek VendegNavigation { get; set; } = null!;
    }
}
