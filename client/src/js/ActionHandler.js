var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DbContext } from "./DbContext.js";
import { Question } from "./Question.js";
export class Gamehandler {
    constructor(gameRender, questions) {
        this.initEventListeners = () => {
            const startQuizBtn = document.querySelector(".quiz-start-btn");
            if (!startQuizBtn)
                throw new Error("No Quiz Button");
            startQuizBtn.addEventListener("click", this.startQuiz);
            const adminButton = document.querySelector(".admin-mode");
            if (!adminButton)
                throw Error("No Admin Button");
            adminButton.addEventListener("click", this.adminMode);
        };
        this.adminMode = (event) => {
            const quizArea = this.getElement("quiz-area");
            quizArea.innerHTML = `<form class="quizForm">
							<h1>Create new question</h1>
							<h5>question</h5>
							<input
								class="quiz-question-input"
								type="text"
							/>
							<h5>answer</h5>
							<input
								class="quiz-answer-input"
								type="text"
							/>
							<h5>alternatives</h5>
							<input
								class="quiz-alternatives-input"
								type="text"
							/>
							<button class="btn btn-primary" type="submit">Submit</button>
						</form>`;
            const quizForm = this.getElement("quizForm");
            quizForm.addEventListener("submit", this.handleFormSubmission);
        };
        this.handleFormSubmission = (event) => {
            event.preventDefault();
            this.gameRender.points = 0;
            const quizForm = event.target;
            const getValue = (className) => this.getElement(className).value;
            const question = getValue("quiz-question-input");
            const answer = getValue("quiz-answer-input");
            const alternatives = getValue("quiz-alternatives-input");
            // Now you can use these values as needed
            console.log("Question:", question);
            console.log("Answer:", answer);
            console.log("Alternatives:", alternatives);
            const alternativesArr = alternatives.split(",");
            const quizQuestion = new Question(0, question, answer, alternativesArr);
            this.dbContext.postNewQuestion(quizQuestion);
        };
        this.addButtonInteraction = (event) => __awaiter(this, void 0, void 0, function* () {
            if (!event.target.textContent || !this.currentQuestion) {
                throw new Error("Event target has no textcontent.");
            }
            console.log();
            const input = event.target.textContent;
            const answer = this.currentQuestion.answer;
            const answerData = { Input: input, Answer: answer };
            const answerIsCorrect = yield this.dbContext.checkAnswer(answerData);
            if (answerIsCorrect)
                this.gameRender.points++;
            const nextQuestion = this.questions.indexOf(this.currentQuestion) + 1;
            this.currentQuestion = this.questions[nextQuestion];
            this.gameRender.placeQuestionsInQuestionbox(this.currentQuestion, this.questions);
            this.initButtonListeners();
        });
        this.startQuiz = () => __awaiter(this, void 0, void 0, function* () {
            console.log("Quiz started");
            this.questions = yield this.dbContext.fetchData();
            //TODO Shuffle questions
            this.currentQuestion = this.questions[0];
            this.gameRender.placeQuestionsInQuestionbox(this.currentQuestion, this.questions);
            this.initButtonListeners();
        });
        this.handleError = (error) => {
            console.error(error);
        };
        this.gameRender = gameRender;
        this.questions = questions;
        this.dbContext = new DbContext();
    }
    getElement(className) {
        const element = document.querySelector(`.${className}`);
        if (!element)
            throw new Error(`Class ${className} not found`);
        return element;
    }
    initButtonListeners() {
        const buttonContainer = document.querySelector(".button-area");
        if (!buttonContainer)
            throw new Error("No button Area");
        buttonContainer.addEventListener("click", this.addButtonInteraction);
    }
}
