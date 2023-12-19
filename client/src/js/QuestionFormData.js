import { inputLinter, questionify } from "./utils.js";
class QuestionFormData extends FormData {
    constructor(form) {
        super(form);
        this.lintFormData = () => {
            if (!this)
                throw new Error("no form data");
            this.question = questionify(this.question);
            this.answer = inputLinter(this.answer);
            this.alternatives = this.alternatives.map(inputLinter);
            console.log(this);
            if (!this.alternatives.includes(this.answer)) {
                throw new Error("Answer has to be in alternatives!!");
            }
            return this;
        };
        this.getCategory = () => {
            const category = this.get("category");
            if (!category)
                throw new Error("No category selected");
            console.log(category);
            return String(category);
        };
        this.getAnswer = () => {
            const inputBoxes = document.querySelectorAll(".alt-input");
            for (const element of inputBoxes) {
                console.log(element.isAnswer);
                if (element.isAnswer)
                    return element.value;
            }
            throw new Error("There has too be atleast one answer");
        };
        this.getAlternatives = () => {
            const inputBoxes = document.querySelectorAll(".alt-input");
            if (inputBoxes.length < 1)
                throw new Error("There has to be atleast one alternative");
            const alternatives = Array.from(inputBoxes).map((input) => input.value);
            return alternatives;
        };
        this.question = this.get("question");
        this.answer = this.getAnswer();
        this.alternatives = this.getAlternatives();
        this.category = this.getCategory();
    }
}
export default QuestionFormData;
