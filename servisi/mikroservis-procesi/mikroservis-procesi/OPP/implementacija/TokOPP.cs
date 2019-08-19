using System;
using mikroservisprocesi.Domen;

namespace mikroservisprocesi.OPP.implementacija
{
    public class TokOPP : SuperOPP<Tok>, ITokOPP
    {
        public TokOPP(BPKontekst kontekst) : base(kontekst)
        {
        }
    }
}
