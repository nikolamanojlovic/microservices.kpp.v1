using System;
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

        public Proces SacuvajProces(long ID, string naziv, string kategorija, string opis)
        {
            _procesOPP.Sacuvaj(new Proces()
            {
                IDProcesa = ID,
                Naziv = naziv,
                Kategorija = kategorija,
                Opis = opis
            });
            return null;
        }

        public long VratiIDNovogProcesa()
        {
            return _procesOPP.VratiIDNovogProcesa();
        }
    }
}
