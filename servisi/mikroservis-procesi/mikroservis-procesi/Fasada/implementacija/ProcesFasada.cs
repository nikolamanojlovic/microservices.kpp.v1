using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using mikroservisprocesi.Domen;
using mikroservisprocesi.OPP;
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

        public string ObrisiProces(long id)
        {
            try
            {
                if (_procesServis.ObrisiProces(id))
                {
                    return "Процес је успешно обрисан!";
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Дошло је до грешке, систем не може да изврши захтев!", ex);
            }
            throw new Exception("Систем није у могућности обрисати процес!");
        }

        public Proces SacuvajProces(ProcesPodaci podaci)
        {
            if ((podaci != null) && (!String.IsNullOrEmpty(podaci.naziv) && !String.IsNullOrEmpty(podaci.kategorija) && !String.IsNullOrEmpty(podaci.opis)))
            {
                try
                {
                    if (podaci.tokovi.Any())
                    {
                        long noviID = _procesServis.VratiIDNovogProcesa();
                        List<Tok> tokovi = new List<Tok>();

                        podaci.tokovi.ForEach(t =>
                        {
                            tokovi.Add(new Tok
                            {
                                IDProcesa = noviID,
                                RBToka = t.rbToka
                            });
                        });

                        return _procesServis.SacuvajProcesSaTokovima(noviID, podaci.naziv, podaci.kategorija, podaci.opis, tokovi);
                    }
                    throw new ArgumentNullException(nameof(podaci.tokovi), "Процес мора имати бар један ток.");
                }
                catch (DbUpdateException ex)
                {
                    throw new Exception("Дошло је до грешке, систем не може сачувати процес.", ex);
                }
            }
            throw new ArgumentNullException(null, "Поља назив, категорија и опис су обавезна.");
        }

        public List<Proces> VratiSveMogucePodproceseSistema(long id)
        {
            return _procesServis.VratiSveMogucePodproceseSistema(id);
        }
    }
}
