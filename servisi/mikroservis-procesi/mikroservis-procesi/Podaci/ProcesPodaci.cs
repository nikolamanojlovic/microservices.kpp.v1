using System;
using System.Collections.Generic;

namespace mikroservisprocesi.Podaci
{
    public class ProcesPodaci
    {
        public string naziv { get; set; }
        public string kategorija { get; set; }
        public string opis { get; set; }
        public List<TokPodaci> tokovi { get; set; }
    }
}
