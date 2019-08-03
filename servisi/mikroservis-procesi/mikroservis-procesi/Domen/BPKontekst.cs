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
        public DbSet<Tranzicija> Tranzicija { get; set; }
        public DbSet<UslovTranzicije> UslovTranzicije { get; set; }

        public DbSet<Dokument> Dokument { get; set; }
        public DbSet<StavkaDokumenta> StavkaDokumenta { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Proces>().HasMany(p => p.Tokovi).WithOne(t => t.Proces).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Proces>().HasMany(p => p.Tranzicije).WithOne(t => t.Proces).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Tranzicija>().HasMany(t => t.UsloviTranzicije).WithOne(ut => ut.Tranzicija).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Dokument>().HasKey(d => new { d.IDDokumenta, d.SifraDokumenta });
            modelBuilder.Entity<Dokument>().HasMany(d => d.Stavke).WithOne(s => s.Dokument).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
