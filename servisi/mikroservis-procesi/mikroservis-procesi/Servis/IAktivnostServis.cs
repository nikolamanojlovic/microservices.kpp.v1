using System;
using System.Collections.Generic;
using mikroservisprocesi.Domen;

namespace mikroservisprocesi.Servis
{
    public interface IAktivnostServis
    {
        List<Aktivnost> VratiSveAktivnosti();
        void SacuvajAktivnost(String naziv, String opis, List<Dokument> ulazi, List<Dokument> izlazi);
        Aktivnost VratiPocetnuAktivnost();
        Aktivnost VratiKrajnjuAktivnost();
    }
}
