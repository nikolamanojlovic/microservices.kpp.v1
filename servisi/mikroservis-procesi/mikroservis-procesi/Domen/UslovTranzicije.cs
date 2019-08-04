using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mikroservisprocesi.Domen
{
    public class UslovTranzicije
    {
        [Key, Column("id_procesa", Order = 0)]
        public long IDProcesa { get; set; }

        [Key, Column("rb_tranzicije", Order = 1)]
        public int RBTranzicije { get; set; }

        [Key, Column("rezultat", Order = 2)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public String Rezultat { get; set; }

        [Column("izlazni_proces")]
        public long IzlazniProce { get; set; }

        [Column("izlazni_tok")]
        public int IzlazniTok { get; set; }

        [Column("id_izlaza")]
        public long IDIzlaza { get; set; }

        public Tranzicija Tranzicija { get; set; }
    }
}
