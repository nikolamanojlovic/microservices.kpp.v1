using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mikroservisprocesi.Domen
{
    [Table("tok")]
    public class Tok
    {
        [Key, Column("id_procesa", Order = 0)]
        public long IDProcesa { get; set; }

        [Key, Column("rb_toka", Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int RBToka { get; set; }

        public Proces Proces { get; set; }

        public List<ProcesUToku> ProcesiUToku { get; set; }
    }
}
