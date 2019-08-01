using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mikroservisprocesi.Domen
{
    [Table("dokument")]
    public class Dokument
    {
        [Key, Column("id_dokumenta")]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int IDDokumenta { get; set; }

        [Key, Column("sifra_dokumenta")]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public String SifraDokumenta { get; set; }

        [Column("naziv")]
        public String Naziv { get; set; }

        [Column("opis")]
        public String Opis { get; set; }

        [Column("tip")]
        public String Tip { get; set; }

        public List<StavkaDokumenta> Stavke { get; set; }
    }
}
