using System;
using mikroservisprocesi.OPP;

namespace mikroservisprocesi.Servis.implementacija
{
    public class ProcesServis : IProcesServis
    {
        private IProcesOPP _procesOPP;

        public ProcesServis(IProcesOPP procesOPP)
        {
            _procesOPP = procesOPP;
        }

        public long VratiIDNovogProcesa()
        {
            return _procesOPP.VratiIDNovogProcesa();
        }
    }
}
