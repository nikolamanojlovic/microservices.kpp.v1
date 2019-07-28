using System;
using System.Collections.Generic;
using mikroserviszaposleni.Domen;
using mikroserviszaposleni.Izuzeci;
using mikroserviszaposleni.Servis;

namespace mikroserviszaposleni.Fasada.implementacija
{
    public class AutentifikacionaFasada : IAutentifikacionaFasada
    {
        private IAutentifikacioniServis _autentifikacioniServis;

        public AutentifikacionaFasada(IAutentifikacioniServis autentifikacioniServis)
        {
            _autentifikacioniServis = autentifikacioniServis;
        }

        public Radnik UlogujRadnika(string korisnickoIme, string sifra)
        {
            if (String.IsNullOrEmpty(korisnickoIme) || String.IsNullOrEmpty(sifra))
            {
               throw new ZaposleniNemaPravoPristupaIzuzetak("Корисничко име и шифра морају бити попуњени.");
            }

            try
            {
                KeyValuePair<int, String> kredencijali = new KeyValuePair<int, String>(Int32.Parse(korisnickoIme), sifra);
                return _autentifikacioniServis.VratiRadnikaPoKredencijalima(kredencijali);
            }
            catch (Exception ex) when (ex is FormatException)
            {
                throw new ZaposleniNemaPravoPristupaIzuzetak("Погрешан формат корисничког имена.");
            }
        }
    }
}
