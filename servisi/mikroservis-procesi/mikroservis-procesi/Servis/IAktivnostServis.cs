using System;
using System.Collections.Generic;
using mikroservisprocesi.Domen;

namespace mikroservisprocesi.Servis
{
    public interface IAktivnostServis
    {
        List<Aktivnost> VratiSveAktivnosti();
        Aktivnost VratiPocetnuAktivnost();
        Aktivnost VratiKrajnjuAktivnost();
    }
}
