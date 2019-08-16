using System;
using System.Collections.Generic;
using mikroservisprocesi.Domen;
using mikroservisprocesi.Servis;

namespace mikroservisprocesi.Fasada.implementacija
{
    public class AktivnostFasada : IAktivnostFasada
    {
        private IAktivnostServis _aktivnostServis;

        public AktivnostFasada(IAktivnostServis aktivnostServis)
        {
            _aktivnostServis = aktivnostServis;
        }

        public Aktivnost VratiKrajnjuAktivnost()
        {
            return _aktivnostServis.VratiKrajnjuAktivnost();
        }

        public Aktivnost VratiPocetnuAktivnost()
        {
            return _aktivnostServis.VratiPocetnuAktivnost();
        }

        public List<Aktivnost> VratiSveAktivnostiSistema()
        {
            return _aktivnostServis.VratiSveAktivnosti();
        }
    }
}
