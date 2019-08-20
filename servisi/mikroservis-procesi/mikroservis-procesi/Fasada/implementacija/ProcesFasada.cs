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

        public string SacuvajTranzicijeZaProces(long id, List<TranzicijaPodaci> tranzicije)
        {
            if (tranzicije != null && tranzicije.Count != 0)
            {
                try
                {
                    List<Tranzicija> noveTranzicije = tranzicije.Select(t => new Tranzicija
                    {
                        IDProcesa = t.idProcesa,
                        RBTranzicije = t.rbTranzicije,
                        UlazniProces = t.ulazniProces,
                        UlazniTok = t.ulazniTok,
                        IDUlaza = t.idUlaza,
                        Uslov = t.uslov,
                        UsloviTranzicije = t.uslovTranzicije.Select(ut => new UslovTranzicije
                        {
                            IDProcesa = t.idProcesa,
                            RBTranzicije = ut.rbTranzicije,
                            Rezultat = ut.rezultat,
                            IzlazniProces = ut.izlazniProces,
                            IzlazniTok = ut.izlazniTok,
                            IDIzlaza = ut.idIzlaza
                        }).ToList()
                    }).ToList();

                    _procesServis.SacuvajTranzicijeZaProces(id, noveTranzicije);
                    return "Транзиције за процес су успешно сачуване!";
                }
                catch (DbUpdateException ex)
                {
                    throw new Exception("Дошло је до грешке, систем не може да сачува транзиције за процес: " + id, ex);
                }
            }

            throw new Exception("Процес мора имати бар две транзиције да би се могао сачувати у систем.");
        }

        public List<Proces> VratiSveMogucePodproceseSistema(long id)
        {
            return _procesServis.VratiSveMogucePodproceseSistema(id);
        }
    }
}
