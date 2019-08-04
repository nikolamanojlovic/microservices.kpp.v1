using System;
using Microsoft.AspNetCore.Mvc;
using mikroservisprocesi.Domen;

namespace mikroservisprocesi.Kontroleri
{
    [Route("api/[controller]")]
    [ApiController]
    public class KreirajKontroler : ControllerBase
    {
        [HttpPost("SacuvajProces")]
        public ActionResult<Proces> SacuvajProces()
        {
            return null;
        }
    }
}
