import { Question } from "./Question";

export class DbContext {
	url = "https://localhost:7076/api/triviagame";
	fetchData = async (): Promise<Question[]> => {
		const response = await fetch(this.url);
		if (!response.ok) throw new Error("Failed fetching data");
		return response.json();
	};
	postNewQuestion = async (question: Question) => {
		const response = await fetch(this.url, {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(question),
		});
		if (!response.ok) throw new Error("failed posting new question");
	};
}
