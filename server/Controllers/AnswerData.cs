namespace server.Controllers
{
    public interface IAnswerData
    {
        string Input { get; set; }
        string Answer { get; set; }

    }
    public class AnswerData : IAnswerData
    {
        public string? Input { get; set; }
        public string? Answer { get; set; }
        public bool IsCorrect()
        {
            return this.Input == this.Answer;
        }
    }
    
}
