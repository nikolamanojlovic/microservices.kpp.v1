using System;
using System.Collections.Generic;
using mikroservisprocesi.Domen;
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

        public bool ObrisiProces(long id)
        {
            return _procesOPP.Obrisi(_procesOPP.VratiPoPK(id));
        }

        public Proces SacuvajProces(long id, string naziv, string kategorija, string opis)
        {
            return _procesOPP.Sacuvaj(new Proces()
            {
                IDProcesa = id,
                Naziv = naziv,
                Kategorija = kategorija,
                Opis = opis
            });
        }

        public long VratiIDNovogProcesa()
        {
            return _procesOPP.VratiIDNovogProcesa();
        }

        public List<Proces> VratiSveMogucePodproceseSistema(long id)
        {
            return _procesOPP.VratiSveMogucePodproceseSistema(id);
        }
    }
}
