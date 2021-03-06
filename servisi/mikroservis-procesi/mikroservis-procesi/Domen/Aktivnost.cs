﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace mikroservisprocesi.Domen
{
    [Table("aktivnost")]
    public class Aktivnost
    {
        [Key, Column("id_aktivnosti")]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public long IDAktivnosti { get; set; }

        [Column("naziv")]
        public String Naziv { get; set; }

        [Column("opis")]
        public String Opis { get; set; }

        public List<Ulaz> Ulazi { get; set; }

        public List<Izlaz> Izlazi { get; set; }

        [JsonIgnore]
        [IgnoreDataMember]
        public List<AktivnostUToku> AktivnostiUToku { get; set; }
    }
}
