using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mikroservisprocesi.Domen
{
    public class UslovTranzicije
    {
        [Key, Column("rezultat")]
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
