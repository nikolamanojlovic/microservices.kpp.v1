using System;
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

        public long VratiIDNovogProcesa()
        {
            return _procesServis.VratiIDNovogProcesa();
        }
    }
}
