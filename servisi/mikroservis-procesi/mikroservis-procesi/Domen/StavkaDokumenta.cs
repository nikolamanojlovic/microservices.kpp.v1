using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mikroservisprocesi.Domen
{
    [Table("stavka_dokumenta")]
    public class StavkaDokumenta
    {
        [Key, Column("id_dokumenta", Order = 0)]
        public int IDDokumenta { get; set; }

        [Key, Column("sifra_dokumenta", Order = 1)]
        public String SifraDokumenta { get; set; }

        [Key, Column("rb_stavke", Order = 2)]
        public int RBStavke { get; set; }

        [Column("naziv")]
        public String Naziv { get; set; }

        [Column("opis")]
        public String Opis { get; set; }

        public Dokument Dokument { get; set; }
    }
}
