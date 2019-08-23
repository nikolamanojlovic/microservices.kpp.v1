using System;
using System.Collections.Generic;
using mikroservisprocesi.Domen;

namespace mikroservisprocesi.Servis
{
    public interface IProcesServis
    {
        long VratiIDNovogProcesa();

        void SacuvajTokoveZaProces(long idProcesa, List<Tok> tokovi);

        bool ObrisiProces(long id);
        bool SacuvajTranzicijeZaProces(long id, List<Tranzicija> tranzicije);

        Proces VratiProcesPoID(long id);
        Proces SacuvajProcesSaTokovima(long id, String naziv, String kategorija, String opis, List<Tok> tokovi);

        List<Proces> VratiSveMogucePodproceseSistema(long id);
    }
}
