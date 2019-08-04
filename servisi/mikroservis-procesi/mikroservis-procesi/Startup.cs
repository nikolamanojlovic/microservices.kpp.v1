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
using mikroservisprocesi.Domen;
using mikroservisprocesi.Fasada;
using mikroservisprocesi.Fasada.implementacija;
using mikroservisprocesi.OPP;
using mikroservisprocesi.OPP.implementacija;
using mikroservisprocesi.Servis;
using mikroservisprocesi.Servis.implementacija;

namespace mikroservis_procesi
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
            services.AddTransient<IAktivnostFasada, AktivnostFasada>();

            // Servisi
            services.AddTransient<IAktivnostServis, AktivnostServis>();

            // OPP
            services.AddTransient<IAktivnostOPP, AktivnostOPP>();
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
                app.UseHsts();
            }

            using (var servis = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = servis.ServiceProvider.GetRequiredService<BPKontekst>();
                context.Database.EnsureCreated();
                context.SaveChanges();
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
