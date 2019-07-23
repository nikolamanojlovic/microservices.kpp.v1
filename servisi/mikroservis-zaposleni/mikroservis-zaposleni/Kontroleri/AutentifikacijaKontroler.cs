using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mikroserviszaposleni.Domen;
using mikroserviszaposleni.Fasada;
using mikroserviszaposleni.Podaci;

namespace mikroserviszaposleni.Kontroleri
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutentifikacijaKontroler : ControllerBase
    {
        private IAutentifikacionaFasada _autentifikacionaFasada;

        public AutentifikacijaKontroler(IAutentifikacionaFasada autentifikacionaFasada)
        {
            _autentifikacionaFasada = autentifikacionaFasada;
        }

        [HttpPost("Autentifikuj")]
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
