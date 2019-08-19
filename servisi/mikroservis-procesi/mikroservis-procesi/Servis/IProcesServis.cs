using System;
using System.Collections.Generic;
using mikroservisprocesi.Domen;

namespace mikroservisprocesi.Servis
{
    public interface IProcesServis
    {
        long VratiIDNovogProcesa();
        Proces VratiProcesPoID(long id);
        Proces SacuvajProces(long id, String naziv, String kategorija, String opis);
        Proces SacuvajProcesSaTokovima(long id, String naziv, String kategorija, String opis, List<Tok> tokovi);
        void SacuvajTokZaProces(long idProcesa, int rbToka);
        bool ObrisiProces(long id);
        List<Proces> VratiSveMogucePodproceseSistema(long id);
    }
}
