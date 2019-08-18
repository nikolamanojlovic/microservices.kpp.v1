using System;
using System.Collections.Generic;
using mikroservisprocesi.Domen;
using mikroservisprocesi.Izuzeci;
using mikroservisprocesi.Servis;

namespace mikroservisprocesi.Fasada.implementacija
{
    public class DokumentFasada : IDokumentFasada
    {
        private IDokumentServis _dokumentServis;

        public DokumentFasada(IDokumentServis dokumentServis)
        {
            _dokumentServis = dokumentServis;
        }

        public List<Dokument> VratiSveDokumenteSistema()
        {
            List<Dokument> dokumenti = _dokumentServis.VratiSveDokumente();

            if (dokumenti.Count == 0)
            {
                throw new SistemNemaDokumenataIzuzetak("У систему тренутно нема докумената!");
            }
            return dokumenti;
        }
    }
}
