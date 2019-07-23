using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using mikroserviszaposleni.Domen;
using mikroserviszaposleni.Fasada;
using mikroserviszaposleni.Fasada.implementacija;
using mikroserviszaposleni.OPP;
using mikroserviszaposleni.OPP.implementacija;
using mikroserviszaposleni.Servis;
using mikroserviszaposleni.Servis.implementacija;

namespace mikroservis_zaposleni
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddDbContext<BPKontekst>(opcije => opcije.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            // Fasade
            services.AddTransient<IAutentifikacionaFasada, AutentifikacionaFasada>();

            // Servisi
            services.AddTransient<IAutentifikacioniServis, AutentifikacioniServis>();

            // OPP
            services.AddTransient<IRadnikOPP, RadnikOPP>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
            }

            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());
            app.UseMvc();
        }
    }
}
