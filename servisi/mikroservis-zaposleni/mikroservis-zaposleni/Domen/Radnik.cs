using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace mikroserviszaposleni.Domen
{
    [Table("radnik")]
    public class Radnik
    {
        [Column("id_radnika")]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int IDRadnika { get; set; }

        [Column("jmbg")]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
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

        [Column("sifra")]
        public String Sifra { get; set; }

        public List<RadnoMesto> RadnoMesto { get; set; }
    }
}
