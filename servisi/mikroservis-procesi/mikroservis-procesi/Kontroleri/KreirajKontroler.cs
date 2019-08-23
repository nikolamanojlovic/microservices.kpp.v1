using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mikroservisprocesi.Domen;
using mikroservisprocesi.Fasada;
using mikroservisprocesi.Podaci;

namespace mikroservisprocesi.Kontroleri
{
    [Route("api/[controller]")]
    [ApiController]
    public class KreirajKontroler : ControllerBase
    {
        private IProcesFasada _procesFasada;
        private IAktivnostFasada _aktivnostFasada;

        public KreirajKontroler(IProcesFasada procesFasada, IAktivnostFasada aktivnostFasada)
        {
            _procesFasada = procesFasada;
            _aktivnostFasada = aktivnostFasada;
        }

        [HttpPost("SacuvajProces")]
        public ActionResult<Proces> SacuvajProces([FromBody] ProcesPodaci proces)
        {
            try
            {
                return _procesFasada.SacuvajNoviProces(proces);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status404NotFound, ex.Message);
            }
        }

        [HttpPost("ObrisiProces/{IDProcesa}")]
        public ActionResult<String> ObrisiProces(long IDProcesa)
        {
            try
            {
                return _procesFasada.ObrisiProces(IDProcesa);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status404NotFound, ex.Message);
            }
        }

        [HttpPost("SacuvajAktivnost")]
        public ActionResult<String> SacuvajAktivnost([FromBody] AktivnostPodaci aktivnost)
        {
            try
            {
                return _aktivnostFasada.SacuvajAktivnost(aktivnost);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status404NotFound, ex.Message);
            }
        }

        [HttpPost("SacuvajTranzicijeZaProces/{IDProcesa}")]
        public ActionResult<String> SacuvajTranzicijeZaProces(long IDProcesa, [FromBody] List<TranzicijaPodaci> tranzicije)
        {
            try
            {
                return _procesFasada.SacuvajTranzicijeZaProces(IDProcesa, tranzicije);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status404NotFound, ex.Message);
            }
        }

        [HttpPost("SacuvajTokoveZaProces/{IDProcesa}")]
        public ActionResult<String> SacuvajTokoveZaProces(long IDProcesa, [FromBody] TokPodaci[] tokovi)
        {
            try
            {
                Console.WriteLine(tokovi);
               // List<TokPodaci> tokPodaci = tokovi.Select(t => t.Value).ToList();
                return _procesFasada.SacuvajTokoveZaProces(IDProcesa, tokovi.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status404NotFound, ex.Message);
            }
        }
    }
}
