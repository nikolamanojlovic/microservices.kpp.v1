using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace mikroservisprocesi.Domen
{
    [Table("tok")]
    public class Tok
    {
        [JsonIgnore]
        [IgnoreDataMember]
        [Key, Column("id_procesa", Order = 0)]
        public long IDProcesa { get; set; }

        [Key, Column("rb_toka", Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int RBToka { get; set; }

        [JsonIgnore]
        [IgnoreDataMember]
        public Proces Proces { get; set; }

        public List<ProcesUToku> ProcesiUToku { get; set; }

        public List<AktivnostUToku> AktivnostiUToku { get; set; }
    }
}
