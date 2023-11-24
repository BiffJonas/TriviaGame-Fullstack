using server.Data;
using server;
namespace server.Controllers

{
    public class DbHandler
    {
        readonly TriviaGameDbContext dbContext;
        public DbHandler(TriviaGameDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        public List<QuestionCard> GetCards()
        {
            return dbContext.Cards.ToList();
        }
    }
}