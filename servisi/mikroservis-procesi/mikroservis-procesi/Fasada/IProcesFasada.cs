using System;
using mikroservisprocesi.Domen;
using mikroservisprocesi.Podaci;

namespace mikroservisprocesi.Fasada
{
    public interface IProcesFasada
    {
        Proces SacuvajProces(ProcesPodaci podaci);
    }
}
