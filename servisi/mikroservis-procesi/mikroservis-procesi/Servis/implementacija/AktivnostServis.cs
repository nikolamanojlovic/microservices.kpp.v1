using System;
using System.Collections.Generic;
using System.Linq;
using mikroservisprocesi.Domen;
using mikroservisprocesi.OPP;

namespace mikroservisprocesi.Servis.implementacija
{
    public class AktivnostServis : IAktivnostServis
    {
        private IAktivnostOPP _aktivnostOPP;

        public AktivnostServis(IAktivnostOPP aktivnostOPP)
        {
            _aktivnostOPP = aktivnostOPP;
        }

        public void SacuvajAktivnost(string naziv, string opis, List<Dokument> ulazi, List<Dokument> izlazi)
        {
            long noviID = _aktivnostOPP.VratiIDNoveAktivnosti();
            List<Ulaz> ulazRelacija = new List<Ulaz>();
            List<Izlaz> izlazRelacija = new List<Izlaz>();

            ulazRelacija = ulazi.Select(ulaz => new Ulaz
            {
                IDAktivnosti = noviID,
                IDDokumenta = ulaz.IDDokumenta,
                SifraDokumenta = ulaz.SifraDokumenta
            }).ToList();

            izlazRelacija = ulazi.Select(ulaz => new Izlaz
            {
                IDAktivnosti = noviID,
                IDDokumenta = ulaz.IDDokumenta,
                SifraDokumenta = ulaz.SifraDokumenta
            }).ToList();


            _aktivnostOPP.Sacuvaj(new Aktivnost
            {
                IDAktivnosti = _aktivnostOPP.VratiIDNoveAktivnosti(),
                Naziv = naziv,
                Opis = opis,
                Ulazi = ulazRelacija,
                Izlazi = izlazRelacija
            });
        }

        public Aktivnost VratiKrajnjuAktivnost()
        {
            return _aktivnostOPP.VratiKrajnjuAktivnost();
        }

        public Aktivnost VratiPocetnuAktivnost()
        {
            return _aktivnostOPP.VratiPocetnuAktivnost();
        }

        public List<Aktivnost> VratiSveAktivnosti()
        {
            return _aktivnostOPP.VratiSveAktivnostiSistema();
        }
    }
}
