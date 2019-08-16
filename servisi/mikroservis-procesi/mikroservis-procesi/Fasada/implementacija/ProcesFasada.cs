using System;
using System.Collections.Generic;
using System.Linq;
using mikroservisprocesi.Domen;
using mikroservisprocesi.Podaci;
using mikroservisprocesi.Servis;

namespace mikroservisprocesi.Fasada.implementacija
{
    public class ProcesFasada : IProcesFasada
    {
        private IProcesServis _procesServis;

        public ProcesFasada(IProcesServis procesServis)
        {
            _procesServis = procesServis;
        }

        public Proces SacuvajProces(ProcesPodaci podaci)
        {
            if ( podaci.GetType().GetProperties().All(p => p.GetValue(podaci) != null ))
            {
               return _procesServis.SacuvajProces(_procesServis.VratiIDNovogProcesa(), podaci.naziv, podaci.kategorija, podaci.opis);
            }
            throw new ArgumentNullException(nameof(podaci), "Поља назив, категорија и опис су обавезна.");
        }

        public List<Proces> VratiSveMogucePodproceseSistema(long id)
        {
            return _procesServis.VratiSveMogucePodproceseSistema(id);
        }
    }
}
