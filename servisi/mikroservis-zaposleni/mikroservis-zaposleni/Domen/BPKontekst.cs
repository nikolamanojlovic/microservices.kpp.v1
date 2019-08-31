using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using mikroserviszaposleni.Pomocne;

namespace mikroserviszaposleni.Domen
{
    public class BPKontekst : DbContext
    {
        public BPKontekst(DbContextOptions<BPKontekst> opcije) : base(opcije)
        {
        }

        public DbSet<Radnik> Radnik { get; set; }
        public DbSet<RadnoMesto> RadnoMesto { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Radnik>().HasKey(r => new { r.IDRadnika, r.JMBG });
            modelBuilder.Entity<RadnoMesto>().HasOne(r => r.Radnik).WithMany(rm => rm.RadnoMesto).HasForeignKey(rm => new {rm.RadnikIDRadnika, rm.RadnikJMBG });

            modelBuilder.Entity<Radnik>().HasData(
                new
                {
                    IDRadnika = 115566,
                    JMBG = "000999000",
                    Ime = "Никола",
                    Prezime = "Манојловић",
                    DatumRodjenja = new DateTime(1995, 7, 3),
                    RadniStaz = 3,
                    Sifra = "nikola",
                    Tip = TipRadnika.POSLOVNI_ANALITICAR
                },
                new
                {
                    IDRadnika = 115577,
                    JMBG = "000999111",
                    Ime = "Јована",
                    Prezime = "Јовић",
                    DatumRodjenja = new DateTime(1990, 7, 3),
                    RadniStaz = 10,
                    Sifra = "jovana",
                    Tip = TipRadnika.NADREDJENI
                }
            );

            modelBuilder.Entity<RadnoMesto>().HasData(
                new
                {
                    IDRadnogMesta = 100,
                    Naziv = "Пословни аналитичар",
                    Opis = "Креирање, управљање и анализирање пословних процеса",
                    RadnikIDRadnika = 115566,
                    RadnikJMBG = "000999000"
                },
                 new
                 {
                     IDRadnogMesta = 101,
                     Naziv = "Креативни директор",
                     Opis = "Одговоран за израду анимација и монтажу",
                     RadnikIDRadnika = 115577,
                     RadnikJMBG = "000999111"
                 }
            );
        }
    }
}
