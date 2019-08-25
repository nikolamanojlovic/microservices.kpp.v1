using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace mikroservisprocesi.Domen
{
    [Table("aktivnost_u_toku")]
    public class AktivnostUToku
    {
        [Key, Column("id_procesa", Order = 0)]
        public long IDProcesa { get; set; }

        [Key, Column("rb_toka", Order = 1)]
        public int RBToka { get; set; }

        [JsonIgnore]
        [IgnoreDataMember]
        public Tok Tok { get; set; }

        [Key, Column("id_aktivnosti", Order = 2)]
        public long IDAktivnosti { get; set; }

        public Aktivnost Aktivnost { get; set; }

        public List<Nadgleda> Nadgleda { get; set; }
    }
}
