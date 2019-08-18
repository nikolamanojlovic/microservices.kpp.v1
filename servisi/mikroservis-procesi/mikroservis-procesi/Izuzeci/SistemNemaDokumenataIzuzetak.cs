using System;
namespace mikroservisprocesi.Izuzeci
{
    public class SistemNemaDokumenataIzuzetak : Exception
    {
        public SistemNemaDokumenataIzuzetak(String poruka) : base(poruka)
        {
        }
    }
}
