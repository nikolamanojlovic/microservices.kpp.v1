using System;
using mikroservisprocesi.Domen;

namespace mikroservisprocesi.OPP.implementacija
{
    public class DokumentOPP : SuperOPP<Dokument>, IDokumentOPP
    {
        public DokumentOPP(BPKontekst kontekst) : base(kontekst)
        {
        }
    }
}
