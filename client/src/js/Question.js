export class Question {
    constructor(id, question, answer, alternatives) {
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
