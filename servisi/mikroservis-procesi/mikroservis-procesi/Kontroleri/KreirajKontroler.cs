using System;
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

        public KreirajKontroler(IProcesFasada procesFasada)
        {
            _procesFasada = procesFasada;
        }

        [HttpPost("SacuvajProces")]
        public ActionResult<Proces> SacuvajProces([FromBody] ProcesPodaci proces)
        {
            return null;
        }
    }
}
