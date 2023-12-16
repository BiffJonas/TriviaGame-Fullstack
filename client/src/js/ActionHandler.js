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
import { GameRender } from "./GameRenderer.js";
import FormHandler from "./FormHandler.js";
import { getElement } from "./utils.js";
export class Gamehandler {
    constructor() {
        this.initEventListeners = () => {
            const startQuizBtn = getElement("quiz-start-btn");
            startQuizBtn.addEventListener("click", this.startQuiz);
            const adminButton = getElement("admin-mode");
            adminButton.addEventListener("click", this.formHandler.adminMode);
        };
        this.addButtonInteraction = (event) => __awaiter(this, void 0, void 0, function* () {
            if (!event.target.textContent || !this.currentQuestion) {
                throw new Error("Event target has no textcontent.");
            }
            const input = event.target.textContent;
            const answer = this.currentQuestion.answer;
            console.log(input);
            const answerData = { Input: input, Answer: answer };
            const answerIsCorrect = yield this.dbContext.checkAnswer(answerData);
            console.log(answerIsCorrect);
            if (answerIsCorrect)
                this.gameRender.points++;
            this.nextQuestion();
            this.initButtonListeners();
        });
        this.catagoryBtnLogic = (event) => __awaiter(this, void 0, void 0, function* () {
            const buttonValue = event.target.value;
            console.log(buttonValue);
            if (buttonValue) {
                this.catagory = buttonValue;
                console.log(this.catagory);
                if (this.catagory && this.catagory !== "All") {
                    this.gameRender.questions =
                        yield this.dbContext.getCatagoryQuestions(this.catagory);
                }
                else {
                    this.gameRender.questions =
                        yield this.dbContext.getShuffledQustions();
                }
            }
            this.firstQuestion();
            this.initButtonListeners();
        });
        this.firstQuestion = () => {
            const questions = this.gameRender.questions;
            if (!questions)
                throw new Error("questions are not defined");
            this.currentQuestion = questions[0];
            this.gameRender.placeQuestionsInQuestionbox(this.currentQuestion, questions);
            this.initButtonListeners();
        };
        this.nextQuestion = () => {
            const questions = this.gameRender.questions;
            if (!questions || !this.currentQuestion) {
                throw new Error("questions are not defined");
            }
            const nextQuestion = questions.indexOf(this.currentQuestion) + 1;
            this.currentQuestion = questions[nextQuestion];
            this.gameRender.placeQuestionsInQuestionbox(this.currentQuestion, questions);
            this.initButtonListeners();
        };
        this.startQuiz = () => __awaiter(this, void 0, void 0, function* () {
            console.log("Quiz started");
            this.gameRender.points = 0;
            this.gameRender.renderCatagoryUI();
            this.initCatagoryButtons();
        });
        this.gameRender = new GameRender(this);
        this.dbContext = new DbContext();
        this.formHandler = new FormHandler();
    }
    initButtonListeners() {
        const buttonContainer = document.querySelector(".button-area");
        if (!buttonContainer)
            throw new Error("No button Area");
        buttonContainer.addEventListener("click", this.addButtonInteraction);
    }
    initCatagoryButtons() {
        const quizArea = getElement("catagory-container");
        quizArea.addEventListener("click", this.catagoryBtnLogic);
    }
}
