﻿using System;
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

        public DbSet<ProcesUToku> ProcesUToku { get; set; }
        public DbSet<AktivnostUToku> AktivnostUToku { get; set; }

        public DbSet<Dokument> Dokument { get; set; }
        public DbSet<StavkaDokumenta> StavkaDokumenta { get; set; }

        public DbSet<Ulaz> Ulaz { get; set; }
        public DbSet<Izlaz> Izlaz { get; set; }

        public DbSet<Nadgleda> Nadgleda { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tok>().HasKey(t => new { t.IDProcesa, t.RBToka });
            modelBuilder.Entity<Proces>().HasMany(p => p.Tokovi).WithOne(t => t.Proces).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Tranzicija>().HasKey(t => new { t.IDProcesa, t.RBTranzicije });
            modelBuilder.Entity<Proces>().HasMany(p => p.Tranzicije).WithOne(t => t.Proces).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UslovTranzicije>().HasKey(ut => new { ut.IDProcesa, ut.RBTranzicije, ut.Rezultat });
            modelBuilder.Entity<Tranzicija>().HasMany(t => t.UsloviTranzicije).WithOne(ut => ut.Tranzicija).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Dokument>().HasKey(d => new { d.IDDokumenta, d.SifraDokumenta });
            modelBuilder.Entity<StavkaDokumenta>().HasKey(sd => new { sd.IDDokumenta, sd.SifraDokumenta, sd.RBStavke });
            modelBuilder.Entity<Dokument>().HasMany(d => d.Stavke).WithOne(s => s.Dokument).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Ulaz>().HasKey(u => new { u.IDAktivnosti, u.IDDokumenta, u.SifraDokumenta });
            modelBuilder.Entity<Ulaz>().HasOne(u => u.Aktivnost).WithMany(a => a.Ulazi).HasForeignKey(u => u.IDAktivnosti);
            modelBuilder.Entity<Ulaz>().HasOne(u => u.Dokument).WithMany(a => a.AktivnostiUlaz).HasForeignKey(u => new { u.IDDokumenta, u.SifraDokumenta });

            modelBuilder.Entity<Izlaz>().HasKey(i => new { i.IDAktivnosti, i.IDDokumenta, i.SifraDokumenta });
            modelBuilder.Entity<Izlaz>().HasOne(i => i.Aktivnost).WithMany(a => a.Izlazi).HasForeignKey(i => i.IDAktivnosti);
            modelBuilder.Entity<Izlaz>().HasOne(i => i.Dokument).WithMany(a => a.AktivnostiIzlaz).HasForeignKey(i => new { i.IDDokumenta, i.SifraDokumenta });

            modelBuilder.Entity<ProcesUToku>().HasKey(put => new { put.IDNadprocesa, put.RBToka, put.IDPodprocesa });
            modelBuilder.Entity<Tok>().HasMany(t => t.PodprocesiUToku).WithOne(put => put.Tok).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Proces>().HasMany(p => p.PodprocesiUToku).WithOne(put => put.Proces);

            modelBuilder.Entity<AktivnostUToku>().HasKey(aut => new { aut.IDProcesa, aut.RBToka, aut.IDAktivnosti });
            modelBuilder.Entity<Tok>().HasMany(t => t.AktivnostiUToku).WithOne(aut => aut.Tok).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Aktivnost>().HasMany(a => a.AktivnostiUToku).WithOne(aut => aut.Aktivnost);

            modelBuilder.Entity<Nadgleda>().HasKey(n => new { n.IDProcesa, n.RBToka, n.IDAktivnosti });
            modelBuilder.Entity<AktivnostUToku>().HasMany(aut => aut.Nadgleda).WithOne(n => n.AktivnostUToku).OnDelete(DeleteBehavior.Cascade);

            // DODAVANJE TEST PODATAKA
            modelBuilder.Entity<Aktivnost>().HasData(
                new
                {
                    IDAktivnosti = Int64.Parse("0"),
                    Naziv = "Почетна активност",
                    Opis = "Активност која означава почетак."
                },
                new
                {
                    IDAktivnosti = Int64.Parse("1"),
                    Naziv = "Крајња активност",
                    Opis = "Активност која означава крај."
                },
                 new
                 {
                     IDAktivnosti = Int64.Parse("2"),
                     Naziv = "Састанак са клијентом",
                     Opis = "Утврђивање захтева и основих захтева."

                 },
                  new
                  {
                      IDAktivnosti = Int64.Parse("3"),
                      Naziv = "Израда сцена",
                      Opis = "Анимирање делова рекламе."

                  },
                  new
                  {
                      IDAktivnosti = Int64.Parse("4"),
                      Naziv = "Израда звука",
                      Opis = "Снимање гласа и музике."

                  },
                  new
                  {
                      IDAktivnosti = Int64.Parse("5"),
                      Naziv = "Монтажа",
                      Opis = " Интеграција сцена и звука."

                  },
                  new
                  {
                      IDAktivnosti = Int64.Parse("6"),
                      Naziv = "Слање рекламе клијенту",
                      Opis = "Слање рекламе путем електронске поште."

                  }
            );


            modelBuilder.Entity<Dokument>().HasData(new
            {
                IDDokumenta = 100,
                SifraDokumenta = "КИ",
                Naziv = "Креативни извештај",
                Opis = "Информације прикупљене од клијента",
                Tip = "pdf",
                Stavke = new
                {
                    RBStavke = 1,
                    Naziv = "Клијент",
                    Opis = "Основне информације о клијенту."
                }
            },
            new
            {
                IDDokumenta = 101,
                SifraDokumenta = "СЦЕ",
                Naziv = "Сцене",
                Opis = "Анимиране сцене",
                Tip = "аеp",
                Stavke = new
                {
                    RBStavke = 1,
                    Naziv = "AEP датотека",
                    Opis = "Пројекат који садржи сцене."
                }
            },
             new
             {
                 IDDokumenta = 102,
                 SifraDokumenta = "МПГ",
                 Naziv = "Звук",
                 Opis = "Пратећа музика и глас",
                 Tip = "mp3",
                 Stavke = new
                 {
                     RBStavke = 1,
                     Naziv = "MP3 датотека",
                     Opis = "Датотека која садржи звук."
                 }
             },
              new
              {
                  IDDokumenta = 103,
                  SifraDokumenta = "РКЛ",
                  Naziv = "Реклама",
                  Opis = "Финална анимација за клијентаФинална анимација за клијента",
                  Tip = "mov",
                  Stavke = new
                  {
                      RBStavke = 1,
                      Naziv = "MOV датотека",
                      Opis = "Датотека која садржи финалну анимацију."
                  }
              });
        }
    }
}
