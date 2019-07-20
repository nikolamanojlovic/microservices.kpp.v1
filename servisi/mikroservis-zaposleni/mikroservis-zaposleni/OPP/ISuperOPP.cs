using System;
using System.Collections.Generic;

namespace mikroserviszaposleni.OPP
{
    public interface ISuperOPP<T> where T : class
    {
        bool Sacuvaj(T entitet);
        bool Obrisi(T entitet);
        List<T> VratiSve();
        T VratiPoPK<K>(K primarni) where K : class;
    }
}
