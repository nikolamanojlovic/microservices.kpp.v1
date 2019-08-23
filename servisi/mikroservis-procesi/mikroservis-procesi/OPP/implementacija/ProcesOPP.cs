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

        public bool SacuvajTranzicijeZaProces(long id, List<Tranzicija> tranzicije)
        {
            VratiPoPK(id).Tranzicije = tranzicije;
            return VratiKontekst().SaveChanges() > 0;
        }

        public long VratiIDNovogProcesa()
        {
            DbSet<Proces> procesi = VratiKontekst().Set<Proces>();
            return !procesi.Any() ? 100000 : procesi.Last().IDProcesa + 1;
        }

        public List<Proces> VratiSveMogucePodproceseSistema(long id)
        {
            return VratiKontekst().Set<Proces>().Where(p => p.IDProcesa != id)
                .Include(p => p.Tokovi).ThenInclude(p => p.AktivnostiUToku)
                .Include(p => p.Tokovi).ThenInclude(p => p.PodprocesiUToku)
                .ToList();
        }
    }
}
