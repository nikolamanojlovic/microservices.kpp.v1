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
        public DbSet<Aktivnost> Aktivnost { get; set; }

        public DbSet<Dokument> Dokument { get; set; }
        public DbSet<StavkaDokumenta> StavkaDokumenta { get; set; }

        public DbSet<Ulaz> Ulaz { get; set; }
        public DbSet<Izlaz> Izlaz { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Proces>().HasMany(p => p.Tokovi).WithOne(t => t.Proces).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Proces>().HasMany(p => p.Tranzicije).WithOne(t => t.Proces).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Tranzicija>().HasMany(t => t.UsloviTranzicije).WithOne(ut => ut.Tranzicija).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Dokument>().HasKey(d => new { d.IDDokumenta, d.SifraDokumenta });
            modelBuilder.Entity<Dokument>().HasMany(d => d.Stavke).WithOne(s => s.Dokument).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Ulaz>().HasKey(u => new { u.IDAktivnosti, u.IDDokumenta, u.SifraDokumenta });
            modelBuilder.Entity<Ulaz>().HasOne(u => u.Aktivnost).WithMany(a => a.Ulazi).HasForeignKey(u => u.IDAktivnosti);
            modelBuilder.Entity<Ulaz>().HasOne(u => u.Dokument).WithMany(a => a.AktivnostiUlaz).HasForeignKey(u => new { u.IDDokumenta, u.SifraDokumenta });

            modelBuilder.Entity<Izlaz>().HasKey(i => new { i.IDAktivnosti, i.IDDokumenta, i.SifraDokumenta });
            modelBuilder.Entity<Izlaz>().HasOne(i => i.Aktivnost).WithMany(a => a.Izlazi).HasForeignKey(i => i.IDAktivnosti);
            modelBuilder.Entity<Izlaz>().HasOne(i => i.Dokument).WithMany(a => a.AktivnostiIzlaz).HasForeignKey(i => new { i.IDDokumenta, i.SifraDokumenta });
        }
    }
}
