using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mikroservisprocesi.Domen
{
    [Table("proces_u_toku")]
    public class ProcesUToku
    {
        [Key, Column("id_procesa")]
        public long IDProcesa { get; set; }
        public Proces Proces { get; set; }

        [Key, Column("rb_toka")]
        public int RBToka { get; set; }

        [Key, Column("id_procesa")]
        public long IDProcesaTok { get; set; }
        public Tok Tok { get; set; }
    }
}
