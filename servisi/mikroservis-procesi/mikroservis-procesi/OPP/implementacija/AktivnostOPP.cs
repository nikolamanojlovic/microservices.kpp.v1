using System;
using System.Collections.Generic;
using System.Linq;
using mikroservisprocesi.Domen;

namespace mikroservisprocesi.OPP.implementacija
{
    public class AktivnostOPP : SuperOPP<Aktivnost>, IAktivnostOPP
    {
        public AktivnostOPP(BPKontekst kontekst) : base(kontekst)
        {

        }

        public List<Aktivnost> VratiSveAktivnostiSistema()
        {
            return VratiKontekst().Set<Aktivnost>().Where(a =>  a.IDAktivnosti != 0 || a.IDAktivnosti != 1).ToList();
        }
    }
}
