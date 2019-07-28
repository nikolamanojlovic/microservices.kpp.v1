using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mikroserviszaposleni.Domen
{
    [Table("radno_mesto")]
    public class RadnoMesto
    {
        [Key, Column("id_radnog_mesta")]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int IDRadnogMesta { get; set; }

        [Column("naziv")]
        public String Naziv { get; set; }

        [Column("opis")]
        public String Opis { get; set; }

        public int RadnikIDRadnika { get; set; }

        public String RadnikJMBG { get; set; }

        [ForeignKey("RadnikIDRadnika, RadnikJMBG")]
        public Radnik Radnik { get; set; }
    }
}
