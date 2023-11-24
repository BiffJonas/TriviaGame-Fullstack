using Microsoft.EntityFrameworkCore;

namespace server.Data
{
    public class TriviaGameDbContext : DbContext
    {

        protected readonly IConfiguration Configuration;

        public TriviaGameDbContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to postgres with connection string from app settings
            options.UseNpgsql(Configuration.GetConnectionString("WebApiDatabase"));
        }
        public DbSet<QuestionCard> Cards { get; set; }
    }

}
