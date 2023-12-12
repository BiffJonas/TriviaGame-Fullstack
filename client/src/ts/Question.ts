export class Question {
	id: number;
	question: string;
	answer: string;
	alternatives: string[];
	constructor(
		id: number,
		question: string,
		answer: string,
		alternatives: string[]
	) {
		this.id = id;
		this.question = question;
		this.answer = answer;
		this.alternatives = alternatives;
	}

	getAnswer() {
		return this.answer;
	}
	getQuestion() {
		return this.question;
	}

	getAlternatives() {
		return this.alternatives;
	}
}
