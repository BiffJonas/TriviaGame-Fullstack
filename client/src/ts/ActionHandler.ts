import { DbContext } from "./DbContext.js";
import { GameRender } from "./GameRenderer.js";
import { Question } from "./Question.js";
import { AnswerData } from "./AnswerData";

import FormHandler from "./FormHandler.js";
import {
	inputLinter,
	questionify,
	getElement,
	initButtonListeners,
} from "./utils.js";
export class Gamehandler {
	gameRender: GameRender;
	currentQuestion: Question | undefined;
	formHandler: FormHandler;
	questions: Question[] | undefined;
	dbContext: DbContext;
	catagory?: string;

	constructor() {
		this.gameRender = new GameRender(this);
		this.dbContext = new DbContext();
		this.formHandler = new FormHandler();
	}

	initControlButtons = () => {
		initButtonListeners(this.startQuiz, ".quiz-start-btn");

		initButtonListeners(this.formHandler.adminMode, ".admin-mode");
	};

	catagoryBtnLogic = async (event: any) => {
		const buttonValue = event.target.value;
		console.log(buttonValue);

		if (buttonValue) {
			this.catagory = buttonValue;
			console.log(this.catagory);
			if (this.catagory && this.catagory !== "All") {
                await this.dbContext.postSelectedCatagory(this.catagory);
			} else {
				this.gameRender.questions =
					await this.dbContext.getShuffledQustions();
			}
		}

		this.firstQuestion();
	};

	addButtonInteraction = async (event: any) => {
		if (!event.target.textContent || !this.currentQuestion) {
			throw new Error("Event target has no textcontent.");
		}
		const input = event.target.textContent;
		const answer = this.currentQuestion.answer;
		console.log(input);

		const answerData: AnswerData = { Input: input, Answer: answer };
		const answerIsCorrect = await this.dbContext.checkAnswer(answerData);
		console.log(answerIsCorrect);

		if (answerIsCorrect) this.gameRender.points++;
		this.nextQuestion();
	};

	firstQuestion = async () => {
		this.currentQuestion = await this.dbContext.getNextQuestion();
        if(!this.currentQuestion) throw new Error("No Questions left")
		this.gameRender.placeQuestionsInQuestionbox( this.currentQuestion,
		);
		console.log("placed questions");
	};
	nextQuestion = () => {
		const questions: Question[] | undefined = this.gameRender.questions;
		if (!questions || !this.currentQuestion) {
			throw new Error("questions are not defined");
		}
		const nextQuestion: number =
			questions.indexOf(this.currentQuestion) + 1;
		this.currentQuestion = questions[nextQuestion];
		this.gameRender.placeQuestionsInQuestionbox(
			this.currentQuestion,
		);
	};

	startQuiz = async () => {
		console.log("Quiz started");
		this.gameRender.points = 0;
		this.gameRender.renderCatagoryUI();
		initButtonListeners(this.catagoryBtnLogic, ".catagory");
	};
}
