using server.Data;
using server;
using System.Collections.Generic;

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
        public void AddCard(QuestionCard card)
        {
            dbContext.Cards.Add(card);
            dbContext.SaveChanges();
        }
        public List<AltQuestionCard> GetAltCards()
        {
            return dbContext.AltCards.ToList();
        }
        public AltQuestionCard? GetCardById(int id)
        {
            return dbContext.AltCards.SingleOrDefault(card => card.Id == id);
        }
        public void AddAltCard(AltQuestionCard card)
        {   
            //check for dupliacate
            //validate input
            //has to be a question
            //svaret måste finnas i alternatives
            //de måste finnas 4 alternativ
            dbContext.AltCards.Add(card);
            dbContext.SaveChanges();
        }

        public List<AltQuestionCard> GetCardsByCatagory(string catagory)
        {
            return dbContext.AltCards.Where(card => card.Catagory == catagory).ToList().Shuffle();
        }
    }
}