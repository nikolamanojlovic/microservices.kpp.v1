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
        private IDokumentFasada _dokumentFasada;

        public PomocniKontroler(IAktivnostFasada aktivnostFasada, IProcesFasada procesFasada, IDokumentFasada dokumentFasada)
        {
            _aktivnostFasada = aktivnostFasada;
            _procesFasada = procesFasada;
            _dokumentFasada = dokumentFasada;
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

        [HttpGet("VratiDokumenteSistema")]
        public ActionResult<List<Dokument>> VratiDokumenteSistema()
        {
            return _dokumentFasada.VratiSveDokumenteSistema();
        }

        [HttpGet("VratiPocetnuAktivnost")]
        public ActionResult<Aktivnost> VratiPocetnuAktivnost()
        {
            return _aktivnostFasada.VratiPocetnuAktivnost();
        }

        [HttpGet("VratiKrajnjuAktivnost")]
        public ActionResult<Aktivnost> VratiKrajnjuAktivnost()
        {
            return _aktivnostFasada.VratiKrajnjuAktivnost();
        }
    }
}
