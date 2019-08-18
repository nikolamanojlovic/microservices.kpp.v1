using System;
using System.Collections.Generic;
using mikroservisprocesi.Domen;

namespace mikroservisprocesi.Servis
{
    public interface IDokumentServis
    {
        List<Dokument> VratiSveDokumente();
    }
}
