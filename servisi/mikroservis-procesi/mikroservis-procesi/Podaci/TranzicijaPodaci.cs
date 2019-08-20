using System;
using System.Collections.Generic;

namespace mikroservisprocesi.Podaci
{
    public class TranzicijaPodaci
    {
        public long idProcesa { get; set; }
        public int rbTranzicije { get; set; }
        public long ulazniProces { get; set; }
        public int ulazniTok { get; set; }
        public long idUlaza { get; set; }
        public String tip { get; set; }
        public String uslov { get; set; }
        public List<UsloviTranzicijePodaci> uslovTranzicije;
    }
}
