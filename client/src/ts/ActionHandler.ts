import { DbContext } from "./DbContext.js";
import { GameRender } from "./GameRenderer.js";
import { Question } from "./Question.js";
import { AnswerData } from "./AnswerData";

export class Gamehandler {
	gameRender: GameRender;
	currentQuestion: Question | undefined;
	questions: Question[];
	dbContext: DbContext;
	catagory?: string;

	constructor(questions: Question[]) {
		this.questions = questions;
		this.gameRender = new GameRender(this.questions, this);
		this.dbContext = new DbContext();
	}

	initEventListeners = () => {
		const startQuizBtn = this.getElement("quiz-start-btn");
		startQuizBtn.addEventListener("click", this.startQuiz);

		const adminButton = this.getElement("admin-mode");
		adminButton.addEventListener("click", this.adminMode);
		const catagoryButton = this.getElement("catagory");
		catagoryButton.addEventListener(
			"click",
			this.gameRender.renderCatagoryUI
		);
	};
	adminMode = (event: any) => {
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
							<h5>catagory</h5>
							<input
								class="quiz-catagory-input"
								type="text"
							/>
							<button class="btn btn-primary" type="submit">Submit</button>
						</form>`;
		const quizForm = this.getElement("quizForm") as HTMLFormElement;

		quizForm.addEventListener("submit", this.handleFormSubmission);
	};
	handleFormSubmission = (event: Event) => {
		event.preventDefault();
		this.gameRender.points = 0;
		const quizForm = event.target as HTMLFormElement;

		const getValue = (className: string) =>
			(this.getElement(className) as HTMLInputElement).value;

		const question = getValue("quiz-question-input");
		const answer = getValue("quiz-answer-input");
		const alternatives = getValue("quiz-alternatives-input");
		const catagory = getValue("quiz-catagory-input");

		// Now you can use these values as needed
		console.log("Question:", question);
		console.log("Answer:", answer);
		console.log("Alternatives:", alternatives);
		console.log("catagory:", catagory);

		const alternativesArr = alternatives.split(",");
		const quizQuestion = new Question(
			0,
			question,
			answer,
			catagory,
			alternativesArr
		);

		this.dbContext.postNewQuestion(quizQuestion);
	};
	getElement(className: string) {
		const element = document.querySelector(`.${className}`);
		if (!element) throw new Error(`Class ${className} not found`);

		return element;
	}

	addButtonInteraction = async (event: any) => {
		if (!event.target.textContent || !this.currentQuestion) {
			throw new Error("Event target has no textcontent.");
		}
		const input = event.target.textContent;
		const answer = this.currentQuestion.answer;

		const answerData: AnswerData = { Input: input, Answer: answer };
		const answerIsCorrect = await this.dbContext.checkAnswer(answerData);
		console.log(answerIsCorrect);

		if (answerIsCorrect) this.gameRender.points++;

		const nextQuestion =
			this.gameRender.questions.indexOf(this.currentQuestion) + 1;
		this.currentQuestion = this.gameRender.questions[nextQuestion];
		this.gameRender.placeQuestionsInQuestionbox(
			this.currentQuestion,
			this.gameRender.questions
		);
		this.initButtonListeners();
	};
	catagoryBtnLogic = (event: any) => {
		const textContent = event.target.textContent;
		if (textContent && event.target.tagName === "BUTTON") {
			this.catagory = textContent;
			console.log(this.catagory);
		}
	};

	startQuiz = async () => {
		console.log("Quiz started");

		this.gameRender.questions = await this.dbContext.getShuffledQustions();
		console.log(this.catagory);
		if (this.catagory) {
			this.gameRender.questions = this.gameRender.questions.filter(
				(question) => question.catagory === this.catagory
			);
		}

		this.currentQuestion = this.gameRender.questions[0];
		this.gameRender.placeQuestionsInQuestionbox(
			this.currentQuestion,
			this.gameRender.questions
		);
		this.initButtonListeners();
	};

	initButtonListeners() {
		const buttonContainer = document.querySelector(".button-area");
		if (!buttonContainer) throw new Error("No button Area");
		buttonContainer.addEventListener("click", this.addButtonInteraction);
	}
	initCatagoryButtons() {
		const quizArea = this.getElement("quiz-area");
		quizArea.addEventListener("click", this.catagoryBtnLogic);
	}
	handleError = (error: any) => {
		console.error(error);
	};
}
