using System;
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
            Radnik nmanojlovic = new Radnik()
            {
                IDRadnika = 115566,
                JMBG = "000999000",
                Ime = "Никола",
                Prezime = "Манојловић",
                DatumRodjenja = new DateTime(1995, 7, 3),
                RadniStaz = 3,
                Sifra = "nikola",
                Tip = TipRadnika.POSLOVNI_ANALITICAR
            };

            RadnoMesto poslovniAnaliticar = new RadnoMesto()
            {
                IDRadnogMesta = 1,
                Naziv = "Пословни аналитичар",
                Opis = "Креирање, управљање и анализирање пословних процеса",
                Radnik = nmanojlovic
            };

            nmanojlovic.RadnoMesto.Add(poslovniAnaliticar);
            

            modelBuilder.Entity<Radnik>().HasData(new Radnik[] { nmanojlovic });
        }
    }
}
