using System;

public interface IAnswerData
{
    string Input { get; set; }
    string Answer { get; set; }

}

public class AnswerData : IAnswerData
{
	public AnswerData()
	{
	}
}
