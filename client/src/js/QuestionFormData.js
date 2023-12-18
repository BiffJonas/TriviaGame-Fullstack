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
        this.question = this.get("question");
        this.answer = this.get("answer");
        const alternatives = this.get("alternatives");
        this.alternatives = alternatives.split(",");
        this.category = this.get("catagory");
    }
}
export default QuestionFormData;
