using System;
using Microsoft.EntityFrameworkCore;

namespace mikroservisprocesi.Domen
{
    public class BPKontekst : DbContext
    {
        public BPKontekst(DbContextOptions<BPKontekst> opcije) : base(opcije)
        {
        }

        public DbSet<Proces> Proces { get; set; }
        public DbSet<Tok> Tok { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Proces>().HasMany(p => p.Tokovi);

            modelBuilder.Entity<Dokument>().HasKey(d => new { d.IDDokumenta, d.SifraDokumenta });
            modelBuilder.Entity<Dokument>().HasMany(d => d.Stavke);
        }
    }
}
