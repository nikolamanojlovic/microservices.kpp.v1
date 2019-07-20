using System;
using System.Collections.Generic;
using mikroserviszaposleni.Domen;

namespace mikroserviszaposleni.Servis
{
    public interface IAutentifikacioniServis
    {
        Radnik VratiRadnikaPoKredencijalima(KeyValuePair<long, String> kredencijali);
    }
}
