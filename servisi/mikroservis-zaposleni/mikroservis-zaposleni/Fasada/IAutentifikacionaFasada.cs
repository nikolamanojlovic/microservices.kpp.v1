using System;
using mikroserviszaposleni.Domen;

namespace mikroserviszaposleni.Fasada
{
    public interface IAutentifikacionaFasada
    {
        Radnik UlogujRadnika(String korisnickoIme, String sifra);
    }
}
