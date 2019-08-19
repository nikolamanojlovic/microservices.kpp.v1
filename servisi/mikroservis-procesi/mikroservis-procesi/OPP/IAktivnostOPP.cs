using System;
using System.Collections.Generic;
using mikroservisprocesi.Domen;

namespace mikroservisprocesi.OPP
{
    public interface IAktivnostOPP : ISuperOPP<Aktivnost>
    {
        List<Aktivnost> VratiSveAktivnostiSistema();
        long VratiIDNoveAktivnosti();
        Aktivnost VratiPocetnuAktivnost();
        Aktivnost VratiKrajnjuAktivnost();
    }
}
