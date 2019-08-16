using System;
using System.Collections.Generic;
using mikroservisprocesi.Domen;
using mikroservisprocesi.Podaci;

namespace mikroservisprocesi.Fasada
{
    public interface IProcesFasada
    {
        Proces SacuvajProces(ProcesPodaci podaci);
        List<Proces> VratiSveMogucePodproceseSistema(long id);
    }
}
