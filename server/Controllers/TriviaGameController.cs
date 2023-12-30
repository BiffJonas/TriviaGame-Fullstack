using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TriviaGameController : ControllerBase
    {
        private readonly DbHandler dbHandler;
        private readonly QuizHandler quizHandler;
        // Constructor with dependency injection
        public TriviaGameController(DbHandler dbHandler, QuizHandler quizHandler)
        {
            this.quizHandler = quizHandler;
            this.dbHandler = dbHandler;
        }
        [HttpGet]
        [EnableCors("_myAllowSpecificOrigins")]
        public IActionResult GetAltCards()
        {
            var cards = dbHandler.GetAltCards();
            return Ok(cards);
        }

        [HttpGet("nextQuestion")]
        [EnableCors("_myAllowSpecificOrigins")]
        public IActionResult GetNextQuestion()
        {
            try
            {

                int nextIndex = quizHandler.CurrentQuiz.IndexOf(quizHandler.CurrentQuestion) + 1;
                if (nextIndex < quizHandler.CurrentQuiz.Count)
                {
                    AltQuestionCard cardToSend = quizHandler.CurrentQuestion;
                    quizHandler.CurrentQuestion = quizHandler.CurrentQuiz[nextIndex];
                    return Ok(cardToSend);
                }else return BadRequest("card is null");
            }



            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }


        [HttpPost("category")]
        [EnableCors("_myAllowSpecificOrigins")]
        public IActionResult GetCardsByCatagory([FromBody] string catagory){
            quizHandler.CurrentCategory = catagory;
            List<AltQuestionCard> cards = dbHandler.GetCardsByCatagory(catagory);
            quizHandler.CurrentQuiz = cards;
            quizHandler.CurrentQuestion = cards[0];
            bool result = quizHandler.CurrentQuiz != null;
            return Ok(result);
        }
        [HttpGet("shuffle")]
        [EnableCors("_myAllowSpecificOrigins")]
        public IActionResult GetSuffledAltCards()
        {
            List<AltQuestionCard> cards = dbHandler.GetAltCards().Shuffle();

            return Ok(cards);
        }
        [HttpGet("{id}")]
        [EnableCors("_myAllowSpecificOrigins")]
        public IActionResult GetCard(int id){
            AltQuestionCard? card = dbHandler.GetCardById(id);

            if(card == null) return NotFound("No card by that id");
            return Ok(card);

        }
        [HttpPost("addcard")]
        [EnableCors("_myAllowSpecificOrigins")]
        public IActionResult AddCardToDatabase([FromBody] AltQuestionCard card)
        {

            if (card == null)
            {
                return BadRequest("Invalid card data");
            }
            bool isDuplicate = dbHandler.GetAltCards().Any(cardInDb => cardInDb.Question == card.Question);
            if(isDuplicate)
            {
                return BadRequest("Cannot add duplicate question");
            }

            bool alternativeExists = card.Alternatives.Count > 0;
            if(!alternativeExists)
            {
                return BadRequest("There must be atleast one alternative");
            }


            dbHandler.AddAltCard(card);
            return Ok();
        }
        [HttpPost("validate")]
        [EnableCors("_myAllowSpecificOrigins")]
        public IActionResult CheckAnswer([FromBody] AnswerData body)
        {
            if (body == null)
            {
                return BadRequest("Invalid submission");
            }
            return Ok(body.IsCorrect());
        }

    }
}
