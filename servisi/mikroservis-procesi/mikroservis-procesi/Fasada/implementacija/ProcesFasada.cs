﻿using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
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

        public Proces SacuvajNoviProces(ProcesPodaci podaci)
        {
            if ((podaci != null) && (!String.IsNullOrEmpty(podaci.naziv) && !String.IsNullOrEmpty(podaci.kategorija)))
            {
                try
                {
                    if (podaci.tokovi.Any())
                    {
                        long noviID = _procesServis.VratiIDNovogProcesa();
                        List<Tok> tokovi = podaci.tokovi.Select(t => new Tok
                        {
                            IDProcesa = noviID,
                            RBToka = t.rbToka
                        }).ToList();

                        return _procesServis.SacuvajProcesSaTokovima(noviID, podaci.naziv, podaci.kategorija, podaci.opis, tokovi);
                    }
                    throw new Exception("Процес мора имати бар један ток.");
                }
                catch (DbUpdateException ex)
                {
                    throw new Exception("Дошло је до грешке, систем не може сачувати процес.", ex);
                }
            }
            throw new Exception("Поља назив, категорија су обавезна.");
        }

        public string SacuvajTokoveZaProces(long id, List<TokPodaci> tokovi)
        {
            if (tokovi.Any())
            {
                try
                {
                    List<Tok> tokoviModel = new List<Tok>();

                    tokovi.ForEach(t =>
                    {
                        int prebroj = 0;

                        Tok novi = new Tok
                        {
                            IDProcesa = id,
                            RBToka = t.rbToka
                        };

                        if (t.aktivnostiUToku != null)
                        {
                            prebroj += t.aktivnostiUToku.Count;
                            novi.AktivnostiUToku = t.aktivnostiUToku.Select(aut => new AktivnostUToku()
                            {
                                IDProcesa = id,
                                RBToka = t.rbToka,
                                IDAktivnosti = aut.idAktivnosti
                            }).ToList();
                        }

                        if (t.podprocesiUToku != null)
                        {
                            prebroj += t.podprocesiUToku.Count;
                            novi.PodprocesiUToku = t.podprocesiUToku.Select(put => new ProcesUToku()
                            {
                                IDNadprocesa = id,
                                RBToka = t.rbToka,
                                IDPodprocesa = put.idProcesa
                            }).ToList();
                        }

                        if ( prebroj < 2 )
                        {
                            throw new Exception("Сваки ток мора имати најмање једну активност или подпроцес.");
                        }

                        tokoviModel.Add(novi);
                    });

                    _procesServis.SacuvajTokoveZaProces(id, tokoviModel);
                    return "Токови за процес " + id + " су успешно сачувани.";
                }
                catch (DbUpdateException ex)
                {
                    throw new Exception("Дошло је до грешке, систем не може сачувати токове за процес " + id + ".", ex);
                }
            }
            throw new Exception("Процес мора имати бар један ток.");
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
