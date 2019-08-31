using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace mikroservisprocesi.Domen
{
    [Table("nadgleda")]
    public class Nadgleda
    {
        [Key, Column("id_procesa", Order = 0)]
        public long IDProcesa { get; set; }

        [Key, Column("rb_toka", Order = 1)]
        public int RBToka { get; set; }

        [Key, Column("id_aktivnosti", Order = 2)]
        public long IDAktivnosti { get; set; }

        [JsonIgnore]
        [IgnoreDataMember]
        public AktivnostUToku AktivnostUToku { get; set; }

        [Key, Column("vreme_od", Order = 3)]
        public DateTime VremeOd;

        [Column("vreme_do")]
        public DateTime VremeDo;

        [Column("id_radnika_nadleznog")]
        public int IDRadnika { get; set; }

        [Column("jmbg_nadleznog")]
        public String JMBG { get; set; }

        [Column("id_radnog_mesta")]
        public int IDRadnogMesta { get; set; }
    }
}
