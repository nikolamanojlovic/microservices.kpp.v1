using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mikroserviszaposleni.Domen
{
    [Table("radno_mesto")]
    public class RadnoMesto
    {
        [Key, Column("id_radnog_mesta")]
        public long IDRadnogMesta { get; set; }

        [Column("naziv")]
        public String Naziv { get; set; }

        [Column("opis")]
        public String Opis { get; set; }

        [Column("radnik")]
        public Radnik Radnik { get; set; }
    }
}
