using System;
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
                return _procesFasada.SacuvajProces(proces);
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
    }
}
