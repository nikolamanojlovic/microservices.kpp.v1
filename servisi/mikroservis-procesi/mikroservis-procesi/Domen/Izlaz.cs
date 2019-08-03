using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mikroservisprocesi.Domen
{
    [Table("izlaz")]
    public class Izlaz
    {
        [Key, Column("id_aktivnosti")]
        public long IDAktivnosti { get; set; }
        public Aktivnost Aktivnost { get; set; }

        [Key, Column("id_dokumenta")]
        public int IDDokumenta { get; set; }

        [Key, Column("sifra_dokumenta")]
        public String SifraDokumenta { get; set; }
        public Dokument Dokument { get; set; }
    }
}
