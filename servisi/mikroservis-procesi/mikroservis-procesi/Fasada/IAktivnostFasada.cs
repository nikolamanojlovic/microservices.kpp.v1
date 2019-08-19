using System;
using System.Collections.Generic;
using mikroservisprocesi.Domen;
using mikroservisprocesi.Podaci;

namespace mikroservisprocesi.Fasada
{
    public interface IAktivnostFasada
    {
        List<Aktivnost> VratiSveAktivnostiSistema();
        Aktivnost VratiPocetnuAktivnost();
        Aktivnost VratiKrajnjuAktivnost();
        String SacuvajAktivnost(AktivnostPodaci aktivnost);
    }
}
