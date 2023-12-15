using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
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
        [HttpGet("addcard")]
        [EnableCors("_myAllowSpecificOrigins")]
        public IActionResult GetAltCards()
        {
            var cards = dbHandler.GetAltCards();
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
        [HttpPost]
        [EnableCors("_myAllowSpecificOrigins")]
        public IActionResult AddCardToDatabase([FromBody] AltQuestionCard card)
        {
            if (card == null)
            {
                return BadRequest("Invalid card data");
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
