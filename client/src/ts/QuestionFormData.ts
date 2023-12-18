import { inputLinter, questionify } from "./utils.js";

class QuestionFormData extends FormData {
	question: string;
	answer: string;
	alternatives: string[];
	category: string;
	constructor(form: HTMLFormElement) {
		super(form);
		this.question = this.get("question") as string;
		this.answer = this.get("answer") as string;

		const alternatives = this.get("alternatives") as string;
		this.alternatives = alternatives.split(",");
		this.category = this.get("catagory") as string;
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
}
export default QuestionFormData;
