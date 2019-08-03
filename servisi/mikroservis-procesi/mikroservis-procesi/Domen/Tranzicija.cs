using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mikroservisprocesi.Domen
{
    public class Tranzicija
    {
        [Key, Column("rb_tranzicije")]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int RBTranzicije { get; set; }

        [Column("ulazni_proces")]
        public long UlazniProces { get; set; }

        [Column("ulazni_tok")]
        public int UlazniTok { get; set; }

        [Column("id_ulaza")]
        public long IDUlaza { get; set; }

        [Column("tip")]
        public String Tip { get; set; }

        [Column("uslov")]
        public String Uslov { get; set; }

        public Proces Proces { get; set; }

        public List<UslovTranzicije> UsloviTranzicije { get; set; }
    }
}
