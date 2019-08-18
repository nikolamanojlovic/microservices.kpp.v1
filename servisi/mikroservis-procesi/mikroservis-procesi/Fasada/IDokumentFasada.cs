using System;
using System.Collections.Generic;
using mikroservisprocesi.Domen;

namespace mikroservisprocesi.Fasada
{
    public interface IDokumentFasada
    {
        List<Dokument> VratiSveDokumenteSistema();
    }
}
