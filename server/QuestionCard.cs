namespace server
{
    public class QuestionCard
    {
        public int Id { get; set; }
        public string? Question { get; set; }
        public string? Answer { get; set; }
        public string GetQuestion()
        {
            return Question;
        }
        public string GetAnswer()
        {
            return Answer;
        }

    }
}
