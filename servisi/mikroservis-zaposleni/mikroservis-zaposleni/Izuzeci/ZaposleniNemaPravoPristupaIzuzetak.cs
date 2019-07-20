using System;
namespace mikroserviszaposleni.Izuzeci
{
    public class ZaposleniNemaPravoPristupaIzuzetak : Exception
    {
        public ZaposleniNemaPravoPristupaIzuzetak(String poruka) : base(poruka)
        {
        }
    }
}
