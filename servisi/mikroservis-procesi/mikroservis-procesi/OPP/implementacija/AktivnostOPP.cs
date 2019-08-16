using System;
using System.Collections.Generic;
using System.Linq;
using mikroservisprocesi.Domen;

namespace mikroservisprocesi.OPP.implementacija
{
    public class AktivnostOPP : SuperOPP<Aktivnost>, IAktivnostOPP
    {
        private const long ID_POCETNE_AKTIVNOSTI = 0;
        private const long ID_KRAJNJE_AKTIVNOSTI = 1;

        public AktivnostOPP(BPKontekst kontekst) : base(kontekst)
        {

        }

        public Aktivnost VratiKrajnjuAktivnost()
        {
            return VratiKontekst().Set<Aktivnost>().Where(a => a.IDAktivnosti == ID_KRAJNJE_AKTIVNOSTI).First();
        }

        public Aktivnost VratiPocetnuAktivnost()
        {
            return VratiKontekst().Set<Aktivnost>().Where(a => a.IDAktivnosti == ID_POCETNE_AKTIVNOSTI).First();
        }

        public List<Aktivnost> VratiSveAktivnostiSistema()
        {
            return VratiKontekst().Set<Aktivnost>().Where(a =>  a.IDAktivnosti != ID_POCETNE_AKTIVNOSTI && a.IDAktivnosti != ID_KRAJNJE_AKTIVNOSTI).ToList();
        }
    }
}
