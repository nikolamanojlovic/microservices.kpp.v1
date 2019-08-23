using System;
using System.Collections.Generic;
using mikroservisprocesi.Domen;
using mikroservisprocesi.Podaci;

namespace mikroservisprocesi.Fasada
{
    public interface IProcesFasada
    {
        String ObrisiProces(long id);
        String SacuvajTranzicijeZaProces(long id, List<TranzicijaPodaci> tranzicije);
        String SacuvajTokoveZaProces(long id, List<TokPodaci> tokovi);

        Proces SacuvajNoviProces(ProcesPodaci podaci);

        List<Proces> VratiSveMogucePodproceseSistema(long id);
    }
}
