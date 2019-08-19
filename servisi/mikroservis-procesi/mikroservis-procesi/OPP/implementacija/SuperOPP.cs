using System;
using System.Collections.Generic;
using System.Linq;
using mikroservisprocesi.Domen;

namespace mikroservisprocesi.OPP.implementacija
{
    public abstract class SuperOPP<T> : ISuperOPP<T> where T : class
    {
        private BPKontekst _kontekst;

        public SuperOPP(BPKontekst kontekst)
        {
            _kontekst = kontekst;
        }

        public bool Obrisi(T entitet)
        {
            _kontekst.Set<T>().Remove(entitet);
            return _kontekst.SaveChanges() > 0;
        }

        public T Sacuvaj(T entitet)
        {
            _kontekst.Set<T>().Add(entitet);
            _kontekst.SaveChanges();

            return entitet;
        }

        public T VratiPoPK<K>(K primarni) where K : struct
        {
            return _kontekst.Set<T>().Find(primarni);
        }

        public List<T> VratiSve()
        {
            return _kontekst.Set<T>().ToList();
        }

        protected BPKontekst VratiKontekst()
        {
            return _kontekst;
        }
    }
}
