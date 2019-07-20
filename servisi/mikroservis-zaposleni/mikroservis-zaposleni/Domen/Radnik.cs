using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mikroserviszaposleni.Domen
{
    [Table("radnik")]
    public class Radnik
    {
        [Key, Column("id_radnika", Order = 0)]
        public long IDRadnika { get; set; }

        [Key, Column("jmbg", Order = 1)]
        public String JMBG { get; set; }

        [Column("ime")]
        public String Ime { get; set; }

        [Column("prezime")]
        public String Prezime { get; set; }

        [Column("radni_staz")]
        public int RadniStaz { get; set; }

        [Column("datum_rodjenja")]
        public DateTime DatumRodjenja { get; set; }

        [Column("tip")]
        public String Tip { get; set; }

        [Column("radno_mesto")]
        public List<RadnoMesto> RadnoMesto { get; set; }
    }
}
