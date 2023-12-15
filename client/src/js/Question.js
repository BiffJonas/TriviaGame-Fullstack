export class Question {
    constructor(id, question, answer, catagory, alternatives) {
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.catagory = catagory;
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
