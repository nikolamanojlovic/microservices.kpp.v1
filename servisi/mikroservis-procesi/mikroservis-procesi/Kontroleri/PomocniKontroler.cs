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
        private IProcesFasada _procesFasada;

        public PomocniKontroler(IAktivnostFasada aktivnostFasada, IProcesFasada procesFasada)
        {
            _aktivnostFasada = aktivnostFasada;
            _procesFasada = procesFasada;
        }

        [HttpGet("VratiAktivnostiSistema")]
        public ActionResult<List<Aktivnost>> VratiAktivnostiSistema()
        {
            return _aktivnostFasada.VratiSveAktivnostiSistema();
        }

        [HttpGet("VratiSveMogucePodproceseSistema/{IDProcesa}")]
        public ActionResult<List<Proces>> VratiSveMogucePodproceseSistema(long IDProcesa)
        {
            return _procesFasada.VratiSveMogucePodproceseSistema(IDProcesa);
        }
    }
}
