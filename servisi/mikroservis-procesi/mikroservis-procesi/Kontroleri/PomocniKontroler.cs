using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using mikroservisprocesi.Domen;
using mikroservisprocesi.Fasada;

namespace mikroservisprocesi.Kontroleri
{
    [Route("api/[controller]")]
    [ApiController]
    public class PomocniKontroler : ControllerBase
    {
        private IAktivnostFasada _aktivnostFasada;

        public PomocniKontroler(IAktivnostFasada aktivnostFasada)
        {
            _aktivnostFasada = aktivnostFasada;
        }

        [HttpGet("VratiAktivnostiSistema")]
        public ActionResult<List<Aktivnost>> VratiAktivnostiSistema()
        {
            return _aktivnostFasada.VratiSveAktivnostiSistema();
        }
    }
}
