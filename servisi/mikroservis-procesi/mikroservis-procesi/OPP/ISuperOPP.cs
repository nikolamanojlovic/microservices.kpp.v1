using System;
using System.Collections.Generic;

namespace mikroservisprocesi.OPP
{
    public interface ISuperOPP<T> where T : class

    {
        T Sacuvaj(T entitet);
        bool Obrisi(T entitet);
        List<T> VratiSve();
        T VratiPoPK<K>(K primarni) where K : struct;
        void SacuvajPromene();
    }
}
