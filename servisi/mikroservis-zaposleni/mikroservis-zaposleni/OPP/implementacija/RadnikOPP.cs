using System;
using System.Collections.Generic;
using System.Linq;
using mikroserviszaposleni.Domen;

namespace mikroserviszaposleni.OPP.implementacija
{
    public class RadnikOPP : SuperOPP<Radnik>, IRadnikOPP 
    {
        public RadnikOPP(BPKontekst kontekst) : base(kontekst)
        { 
        }

        public Radnik VratiPoKredencijalima(KeyValuePair<int, string> kredencijali)
        {
            return VratiKontekst().Set<Radnik>().SingleOrDefault(r => r.IDRadnika == kredencijali.Key && r.Sifra.Equals(kredencijali.Value));
        }
    }
}
