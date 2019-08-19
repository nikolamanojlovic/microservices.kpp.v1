using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using mikroservisprocesi.Domen;
using mikroservisprocesi.Podaci;
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

        public string SacuvajAktivnost(AktivnostPodaci aktivnost)
        {
            try
            {
                _aktivnostServis.SacuvajAktivnost(aktivnost.naziv, aktivnost.opis, aktivnost.ulazi, aktivnost.izlazi);
                return "Систем је успешно сачувао нову активност.";
            }
            catch (Exception ex)
            {
                throw new Exception("Дошло је до грешке. Систем није у могућности вратити активности система.", ex);
            }
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
