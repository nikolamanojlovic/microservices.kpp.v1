using System;
using System.Collections.Generic;
using mikroservisprocesi.Domen;

namespace mikroservisprocesi.Servis
{
    public interface IProcesServis
    {
        long VratiIDNovogProcesa();
        Proces SacuvajProces(long id, String naziv, String kategorija, String opis);
        bool ObrisiProces(long id);
        List<Proces> VratiSveMogucePodproceseSistema(long id);
    }
}
