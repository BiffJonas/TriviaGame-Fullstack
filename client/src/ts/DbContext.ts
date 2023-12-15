import { AnswerData } from "./AnswerData";
import { Question } from "./Question";

export class DbContext {
	url = "https://localhost:7076/api/triviagame/";
	getAllQuestions = async (): Promise<Question[]> => {
		const response = await fetch(this.url);
		if (!response.ok) throw new Error("Failed fetching data");
		return response.json();
	};
	getShuffledQustions = async (): Promise<Question[]> => {
		const response = await fetch(this.url + "shuffle");
		if (!response.ok) throw new Error("Failed fetching shuffled questions");
		return response.json();
	};
	getQuestionById = async (id: number): Promise<Question> => {
		const response = await fetch(this.url + id);
		if (!response.ok) {
			throw new Error(`Failed to fetch question with id: ${id}`);
		}
		return await response.json();
	};
	postNewQuestion = async (question: Question) => {
		const response = await fetch(this.url + "addcard", {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(question),
		});
		if (!response.ok) throw new Error("failed posting new question");
	};
	checkAnswer = async (body: AnswerData) => {
		//Wrong here
		const response = await fetch(this.url + "validate", {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(body),
		});
		if (!response.ok) throw new Error("Failed to send response");
		return await response.json();
	};
}
