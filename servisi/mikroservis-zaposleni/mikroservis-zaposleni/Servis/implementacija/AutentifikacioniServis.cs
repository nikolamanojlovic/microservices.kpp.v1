using System;
using System.Collections.Generic;
using mikroserviszaposleni.Domen;
using mikroserviszaposleni.Izuzeci;
using mikroserviszaposleni.OPP;
using mikroserviszaposleni.Pomocne;

namespace mikroserviszaposleni.Servis.implementacija
{
    public class AutentifikacioniServis : IAutentifikacioniServis
    {
        private IRadnikOPP _radnikOPP;

        public AutentifikacioniServis(IRadnikOPP radnikOPP)
        {
            _radnikOPP = radnikOPP;
        }

        public Radnik VratiRadnikaPoKredencijalima(KeyValuePair<int, string> kredencijali)
        {
            try
            {
                Radnik radnik = _radnikOPP.VratiPoKredencijalima(kredencijali);

                if (TipRadnika.POSLOVNI_ANALITICAR.Equals(radnik.Tip))
                {
                    return radnik;
                }

                throw new ZaposleniNemaPravoPristupaIzuzetak("Запослени није пословни аналитичар.");
            }
            catch (Exception ex) when (ex is ArgumentNullException || ex is InvalidOperationException)
            {
                throw new ZaposleniNemaPravoPristupaIzuzetak("Креденцијали су неодговарајући.");
            }
        }
    }
}
