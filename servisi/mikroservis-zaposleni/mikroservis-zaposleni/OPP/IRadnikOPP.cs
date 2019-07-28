using System;
using System.Collections.Generic;
using mikroserviszaposleni.Domen;

namespace mikroserviszaposleni.OPP
{
    public interface IRadnikOPP : ISuperOPP<Radnik>
    {
        /// <summary>
        /// Vraca radnika na osnovu kredencijala ukoliko nema radnika, ili ih ima vise od jedan
        /// baca gresku
        /// </summary>
        Radnik VratiPoKredencijalima(KeyValuePair<int, String> kredencijali);
    }
}
