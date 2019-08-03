using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mikroservisprocesi.Domen
{
    [Table("tok")]
    public class Tok
    {
        [Key, Column("rb_toka")]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int RBToka { get; set; }

        public Proces Proces { get; set; }
    }
}
