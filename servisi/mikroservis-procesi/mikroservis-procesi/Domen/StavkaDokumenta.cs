using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mikroservisprocesi.Domen
{
    [Table("stavka_dokumenta")]
    public class StavkaDokumenta
    {
        [Key, Column("rb_stavke")]
        public int IDDokumenta { get; set; }

        [Column("naziv")]
        public String Naziv { get; set; }

        [Column("opis")]
        public String Opis { get; set; }
    }
}
