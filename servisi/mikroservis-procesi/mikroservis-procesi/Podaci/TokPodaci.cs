using System;
using System.Collections.Generic;

namespace mikroservisprocesi.Podaci
{
    public class TokPodaci
    {
        public int rbToka { get; set; }
        public List<AktivnostPodaci> aktivnostiUToku { get; set; }
        public List<ProcesPodaci> podprocesiUToku { get; set; }
    }
}
