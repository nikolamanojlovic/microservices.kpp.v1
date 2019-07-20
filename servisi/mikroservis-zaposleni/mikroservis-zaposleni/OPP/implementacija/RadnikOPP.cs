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

        public Radnik VratiPoKredencijalima(KeyValuePair<long, string> kredencijali)
        {
            return VratiKontekst().Set<Radnik>().Single(r => r.IDRadnika.Equals(kredencijali.Key) && r.Sifra.Equals(kredencijali.Value));
        }
    }
}
