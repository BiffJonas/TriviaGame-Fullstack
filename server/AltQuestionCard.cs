namespace server
{
    public class AltQuestionCard
    {
        public int Id { get; set; }
        public string? Question { get; set; }
        public string? Answer { get; set; }
        public List<string>? Alternatives { get; set; }
    }
}
