using System;
using Microsoft.EntityFrameworkCore;

namespace mikroserviszaposleni.Domen
{
    public class BPKontekst : DbContext
    {
        public BPKontekst(DbContextOptions<BPKontekst> opcije) : base(opcije)
        {
        }

        public DbSet<Radnik> Radnik { get; set; }
        public DbSet<RadnoMesto> RadnoMesto { get; set; }
    }
}
