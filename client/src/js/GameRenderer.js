import { getElement, initButtonListeners } from "./utils.js";
export class GameRender {
    constructor(gameHandler) {
        this.renderCatagoryUI = () => {
            const catagory = getElement(".quiz-area");
            if (!catagory)
                throw new Error("no quiz area");
            //TODO all of this feels incredibly horrible
            catagory.innerHTML = `<div class="catagory-container">
							<h2>Catagories</h2>
							<button class="btn catagory btn-success"value="Animals">Animals</button>
							<button class="btn catagory btn-success"value="Teachers">Teachers</button>
							<button class="btn catagory btn-success" value="Math">Math</button>
							<button class="btn catagory btn-success" value="All">All</button>
							</div>`;
        };
        this.gameHandler = gameHandler;
        this.points = 0;
    }
    renderQuestionHTML(question, alternatives) {
        return `<h1 class="question-header">${question}</h1> <div class="button-area">${this.renderAlternatives(alternatives)}</div>`;
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
        initButtonListeners(this.gameHandler.addButtonInteraction, ".alternative");
    }
    finishedQuiz() {
        if (!this.questions)
            throw new Error("Questions are not defined");
        const finishedText = `<h1>Quiz Completed</h1> <div class="button-area"><h2>Your Score: ${this.points}/${this.questions.length}</h2></div>`;
        this.points = 0;
        return finishedText;
    }
}
