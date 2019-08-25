using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace mikroservisprocesi.Domen
{
    [Table("proces_u_toku")]
    public class ProcesUToku
    {
        [Key, Column("id_nadprocesa", Order = 0)]
        public long IDNadprocesa { get; set; }

        [Key, Column("rb_toka", Order = 1)]
        public int RBToka { get; set; }

        [JsonIgnore]
        [IgnoreDataMember]
        public Tok Tok { get; set; }

        [Key, Column("id_podprocesa", Order = 2)]
        public long IDPodprocesa { get; set; }

        public Proces Proces { get; set; }
    }
}
