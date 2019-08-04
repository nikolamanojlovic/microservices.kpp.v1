using System;
using System.Collections.Generic;
using mikroservisprocesi.Domen;

namespace mikroservisprocesi.Fasada
{
    public interface IAktivnostFasada
    {
        List<Aktivnost> VratiSveAktivnostiSistema();
    }
}
