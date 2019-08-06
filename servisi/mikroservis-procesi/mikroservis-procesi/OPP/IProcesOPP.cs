using System;
using mikroservisprocesi.Domen;

namespace mikroservisprocesi.OPP
{
    public interface IProcesOPP : ISuperOPP<Proces>
    {
        long VratiIDNovogProcesa();
    }
}
