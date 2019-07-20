using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mikroserviszaposleni.Domen;
using mikroserviszaposleni.Fasada;
using mikroserviszaposleni.Podaci;

namespace mikroserviszaposleni.Kontroleri
{
    [Route("api/autentifikuj")]
    [ApiController]
    public class AutentifikacioniKontroler : ControllerBase
    {
        private IAutentifikacionaFasada _autentifikacionaFasada;

        public AutentifikacioniKontroler(IAutentifikacionaFasada autentifikacionaFasada)
        {
            _autentifikacionaFasada = autentifikacionaFasada;
        }

        [HttpPost]
        public ActionResult<Radnik> Autentifikuj([FromBody] Kredencijali kredencijali)
        {
            try
            {
                return _autentifikacionaFasada.UlogujRadnika(kredencijali.KorisnickoIme, kredencijali.Sifra);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status401Unauthorized, ex.Message);
            }
        }
    }
}
