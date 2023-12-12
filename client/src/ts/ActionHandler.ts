import { DbContext } from "./DbContext.js";
import { GameRender } from "./GameRenderer.js";
import { Question } from "./Question.js";
export class Gamehandler {
	gameRender: GameRender;
	questions: Question[];
	currentQuestion: Question | undefined;

	constructor(gameRender: GameRender, questions: Question[]) {
		this.gameRender = gameRender;
		this.questions = questions;
	}

	initEventListeners = () => {
		const startQuizBtn = document.querySelector(".quiz-start-btn");
		if (!startQuizBtn) throw new Error("No Quiz Button");
		startQuizBtn.addEventListener("click", this.startQuiz);

		const adminButton = document.querySelector(".admin-mode");
		if (!adminButton) throw Error("No Admin Button");
		adminButton.addEventListener("click", this.adminMode);
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

		// Now you can use these values as needed
		console.log("Question:", question);
		console.log("Answer:", answer);
		console.log("Alternatives:", alternatives);
		const alternativesArr = alternatives.split(",");
		const quizQuestion = new Question(0, question, answer, alternativesArr);

		const dbContext = new DbContext();
		dbContext.postNewQuestion(quizQuestion);
	};
	getElement(className: string) {
		const element = document.querySelector(`.${className}`);
		if (!element) throw new Error(`Class ${className} not found`);

		return element;
	}

	addButtonInteraction = (event: any) => {
		if (!event.target.textContent || !this.currentQuestion) {
			throw new Error("Event target has no textcontent.");
		}
		console.log(event.target.textContent);

		this.gameRender.validateAnswer(
			event.target.textContent,
			this.currentQuestion.answer
		);
		const nextQuestion = this.questions.indexOf(this.currentQuestion) + 1;
		this.currentQuestion = this.questions[nextQuestion];
		this.gameRender.placeQuestionsInQuestionbox(this.currentQuestion);
		this.initButtonListeners();
	};

	startQuiz = async () => {
		console.log("Quiz started");
		const dbContext = new DbContext();
		this.questions = await dbContext.fetchData();

		//TODO Shuffle questions
		this.currentQuestion = this.questions[0];
		this.gameRender.placeQuestionsInQuestionbox(this.currentQuestion);
		this.initButtonListeners();
	};

	initButtonListeners() {
		const buttonContainer = document.querySelector(".button-area");
		if (!buttonContainer) throw new Error("No button Area");
		buttonContainer.addEventListener("click", this.addButtonInteraction);
	}
	handleError = (error: any) => {
		console.error(error);
	};
}
