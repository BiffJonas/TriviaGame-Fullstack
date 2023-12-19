import { InputBox } from "./InputBox.js";
import { inputLinter, questionify } from "./utils.js";

class QuestionFormData extends FormData {
	question: string;
	answer: string;
	alternatives: string[];
	category: string;
	constructor(form: HTMLFormElement) {
		super(form);
		this.question = this.get("question") as string;
		this.answer = this.getAnswer();
		this.alternatives = this.getAlternatives();
		this.category = this.getCategory();
	}
	lintFormData = (): QuestionFormData => {
		if (!this) throw new Error("no form data");
		this.question = questionify(this.question);
		this.answer = inputLinter(this.answer);

		this.alternatives = this.alternatives.map(inputLinter);
		console.log(this);

		if (!this.alternatives.includes(this.answer)) {
			throw new Error("Answer has to be in alternatives!!");
		}
		return this;
	};
	getCategory = (): string => {
		const category = this.get("category");

		if (!category) throw new Error("No category selected");

		console.log(category);
		return String(category);
	};
	getAnswer = (): string => {
		const inputBoxes = document.querySelectorAll<InputBox>(".alt-input");
		for (const element of inputBoxes) {
			console.log(element.isAnswer);
			if (element.isAnswer) return element.value;
		}
		throw new Error("There has too be atleast one answer");
	};
	getAlternatives = (): string[] => {
		const inputBoxes =
			document.querySelectorAll<HTMLInputElement>(".alt-input");
		if (inputBoxes.length < 1)
			throw new Error("There has to be atleast one alternative");
		const alternatives = Array.from(inputBoxes).map((input) => input.value);
		return alternatives;
	};
}
export default QuestionFormData;
