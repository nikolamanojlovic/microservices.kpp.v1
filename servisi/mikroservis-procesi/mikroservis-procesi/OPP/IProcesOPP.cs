using System;
using System.Collections.Generic;
using mikroservisprocesi.Domen;

namespace mikroservisprocesi.OPP
{
    public interface IProcesOPP : ISuperOPP<Proces>
    {
        long VratiIDNovogProcesa();
        List<Proces> VratiSveMogucePodproceseSistema(long id);
        bool SacuvajTranzicijeZaProces(long id, List<Tranzicija> tranzicije);
    }
}
