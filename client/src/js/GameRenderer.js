export class GameRender {
    constructor(questions) {
        this.validateAnswer = (userAnswer, correctAnswer) => {
            const score = document.querySelector(".score--state-count");
            if (!score)
                throw new Error("No Score Element");
            if (userAnswer === correctAnswer) {
                this.points++;
            }
        };
        this.questions = questions;
        this.points = 0;
    }
    renderQuestionHTML(question, alternatives) {
        return `<h1>${question}</h1> <div class="button-area">${this.renderAlternatives(alternatives)}</div>`;
    }
    renderAlternatives(alternatives) {
        return alternatives
            .map((alternative) => `<button class="btn alternative btn-success">${alternative}</button>`)
            .join("");
    }
    placeQuestionsInQuestionbox(quiz) {
        const QuizContainer = document.querySelector(".quiz-area");
        if (!QuizContainer)
            throw new Error("No quiz-area");
        let content = "";
        if (!quiz) {
            content = this.finishedQuiz();
        }
        else {
            const { question, alternatives } = quiz;
            content = this.renderQuestionHTML(question, alternatives);
        }
        QuizContainer.innerHTML = content;
    }
    finishedQuiz() {
        const finishedText = `<h1>Quiz Completed</h1> <div class="button-area"><h2>Your Score: ${this.points}/${this.questions.length}</h2></div>`;
        this.points = 0;
        return finishedText;
    }
}
