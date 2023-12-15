export class GameRender {
    constructor(questions, gameHandler) {
        this.validateAnswer = (userAnswer, correctAnswer) => {
            const score = document.querySelector(".score--state-count");
            if (!score)
                throw new Error("No Score Element");
            if (userAnswer === correctAnswer) {
                this.points++;
            }
        };
        this.renderCatagoryUI = () => {
            const catagory = document.querySelector(".quiz-area");
            if (!catagory)
                throw new Error("no quiz area");
            //TODO all of this feels incredibly horrible
            catagory.innerHTML = `<h2>Catagories</h2>
							<button class="btn btn-success">animals</button>
							<button class="btn btn-success">Teachers</button>
							<button class="btn btn-success">Math</button>`;
            this.gameHandler.initCatagoryButtons();
        };
        this.gameHandler = gameHandler;
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
    placeQuestionsInQuestionbox(quiz, questions) {
        const QuizContainer = document.querySelector(".quiz-area");
        this.questions = questions;
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
