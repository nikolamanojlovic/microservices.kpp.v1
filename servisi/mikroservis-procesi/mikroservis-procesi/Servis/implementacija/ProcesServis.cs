using System;
using System.Collections.Generic;
using mikroservisprocesi.Domen;
using mikroservisprocesi.OPP;

namespace mikroservisprocesi.Servis.implementacija
{
    public class ProcesServis : IProcesServis
    {
        private IProcesOPP _procesOPP;
        private ITokOPP _tokOPP;

        public ProcesServis(IProcesOPP procesOPP, ITokOPP tokOPP)
        {
            _procesOPP = procesOPP;
            _tokOPP = tokOPP;
        }

        public Proces VratiProcesPoID(long id)
        {
            return _procesOPP.VratiPoPK(id);
        }

        public bool ObrisiProces(long id)
        {
            return _procesOPP.Obrisi(_procesOPP.VratiPoPK(id));
        }

        public Proces SacuvajProces(long id, string naziv, string kategorija, string opis)
        {
            _procesOPP.Sacuvaj(new Proces()
            {
                IDProcesa = id,
                Naziv = naziv,
                Kategorija = kategorija,
                Opis = opis
            });

            return _procesOPP.VratiPoPK(id);
        }

        public void SacuvajTokZaProces(long idProcesa, int rbToka)
        {
            _tokOPP.Sacuvaj(new Tok {
                IDProcesa = idProcesa,
                RBToka = rbToka
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

        public Proces SacuvajProcesSaTokovima(long id, string naziv, string kategorija, string opis, List<Tok> tokovi)
        {
            _procesOPP.Sacuvaj(new Proces()
            {
                IDProcesa = id,
                Naziv = naziv,
                Kategorija = kategorija,
                Opis = opis,
                Tokovi = tokovi
            });

            return _procesOPP.VratiPoPK(id);
        }
    }
}
