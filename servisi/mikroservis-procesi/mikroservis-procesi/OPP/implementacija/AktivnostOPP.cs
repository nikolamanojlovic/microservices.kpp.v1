using System;
using mikroservisprocesi.Domen;

namespace mikroservisprocesi.OPP.implementacija
{
    public class AktivnostOPP : SuperOPP<Aktivnost>, IAktivnostOPP
    {
        public AktivnostOPP(BPKontekst kontekst) : base(kontekst)
        {

        }
    }
}
