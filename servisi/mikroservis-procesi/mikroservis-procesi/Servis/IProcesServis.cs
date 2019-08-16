using System;
using System.Collections.Generic;
using mikroservisprocesi.Domen;

namespace mikroservisprocesi.Servis
{
    public interface IProcesServis
    {
        long VratiIDNovogProcesa();
        Proces SacuvajProces(long ID, String naziv, String kategorija, String opis);
        List<Proces> VratiSveMogucePodproceseSistema(long id);
    }
}
