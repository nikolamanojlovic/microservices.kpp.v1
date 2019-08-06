using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using mikroservisprocesi.Domen;

namespace mikroservisprocesi.OPP.implementacija
{
    public class ProcesOPP : SuperOPP<Proces>, IProcesOPP
    {
        public ProcesOPP(BPKontekst kontekst) : base(kontekst)
        {
        }

        public long VratiIDNovogProcesa()
        {
            DbSet<Proces> procesi = VratiKontekst().Proces;
            return procesi.Any() ? 0 : procesi.Last().IDProcesa + 1;
        }
    }
}
