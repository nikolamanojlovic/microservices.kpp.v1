using System;
using System.Collections.Generic;
using mikroservisprocesi.Domen;
using mikroservisprocesi.OPP;

namespace mikroservisprocesi.Servis.implementacija
{
    public class DokumentServis : IDokumentServis
    {
        private IDokumentOPP _dokumentOPP;

        public DokumentServis(IDokumentOPP dokumentOPP)
        {
            _dokumentOPP = dokumentOPP;
        }

        public List<Dokument> VratiSveDokumente()
        {
            return _dokumentOPP.VratiSve();
        }
    }
}
