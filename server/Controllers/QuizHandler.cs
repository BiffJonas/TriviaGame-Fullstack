using server;
namespace server.Controllers

{
    public class QuizHandler
    {
        public AltQuestionCard? CurrentQuestion {get; set;}
        public List<AltQuestionCard?> CurrentQuiz {get; set;}
        public string CurrentCategory {get; set;}

    }
}

