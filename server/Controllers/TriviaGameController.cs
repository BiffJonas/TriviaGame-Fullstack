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
        [HttpGet]
        public IActionResult GetCards()
        {
            var cards = dbHandler.GetCards();
            return Ok(cards);
        }
    }
}
