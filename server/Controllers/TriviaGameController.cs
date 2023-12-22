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

        public TriviaGameController(DbHandler dbHandler)
        {
            this.dbHandler = dbHandler;
        }
        [HttpGet]
        [EnableCors("_myAllowSpecificOrigins")]
        public IActionResult GetAltCards()
        {
            var cards = dbHandler.GetAltCards();
            return Ok(cards);
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
        [HttpGet("catagory/{catagory}")]
        [EnableCors("_myAllowSpecificOrigins")]
        public IActionResult GetCardsByCatagory(string catagory){
            List<AltQuestionCard> cards = dbHandler.GetCardsByCatagory(catagory);
            return Ok(cards);
        }
        
        //[HttpPost]
        //[EnableCors("_myAllowSpecificOrigins")]
        //public IActionResult AddCardToDatabase([FromBody] QuestionCard card)
        //{
        //    if (card == null)
        //    {
        //        return BadRequest("Invalid card data");
        //    }

        //    dbHandler.AddCard(card);
        //    return Ok();
        //}
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
