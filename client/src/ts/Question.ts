export class Question {
	id: number;
	question: string;
	answer: string;
	catagory: string;
	alternatives: string[];
	constructor(
		id: number,
		question: string,
		answer: string,
		catagory: string,
		alternatives: string[]
	) {
		this.id = id;
		this.question = question;
		this.answer = answer;
		this.catagory = catagory;
		this.alternatives = alternatives;
	}
}
