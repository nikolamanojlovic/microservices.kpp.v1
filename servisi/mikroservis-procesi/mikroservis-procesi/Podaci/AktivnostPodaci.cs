using System;
using System.Collections.Generic;
using mikroservisprocesi.Domen;

namespace mikroservisprocesi.Podaci
{
    public class AktivnostPodaci
    {
        public long idAktivnosti { get; set; }
        public String naziv { get; set; }
        public String opis { get; set; }
        public List<Dokument> ulazi { get; set; }
        public List<Dokument> izlazi { get; set; }
    }
}
