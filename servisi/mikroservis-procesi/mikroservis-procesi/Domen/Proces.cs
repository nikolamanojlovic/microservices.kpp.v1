using System;
using System.Collections.Generic;

namespace mikroservisprocesi.Domen
{
    public class Proces
    {
        public long ID { get; set; }
        public String Naziv { get; set; }
        public String Opis { get; set; }
        public String Kategorija { get; set; }
        public DateTime VremeKreiranja { get; set; }
        public List<Tok> Tokovi { get; set; }
    }
}
