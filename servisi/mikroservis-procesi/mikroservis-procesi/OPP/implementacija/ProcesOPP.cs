using System;
using System.Collections.Generic;
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

        public List<Proces> VratiSveMogucePodproceseSistema(long id)
        {
            return VratiKontekst().Set<Proces>().Where(p => p.IDProcesa != id).ToList();
        }
    }
}
