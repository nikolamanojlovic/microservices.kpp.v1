using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace mikroservisprocesi.Domen
{
    [Table("proces")]
    public class Proces
    {
        [Key, Column("id_procesa")]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public long IDProcesa { get; set; }

        [Column("naziv")]
        public String Naziv { get; set; }

        [Column("opis")]
        public String Opis { get; set; }

        [Column("kategorija")]
        public String Kategorija { get; set; }

        [Column("vreme_kreiranja")]
        public DateTime VremeKreiranja { get; set; }

        public List<Tok> Tokovi { get; set; }

        public List<Tranzicija> Tranzicije { get; set; }

        [JsonIgnore]
        [IgnoreDataMember]
        public List<ProcesUToku> PodprocesiUToku { get; set; }
    }
}
