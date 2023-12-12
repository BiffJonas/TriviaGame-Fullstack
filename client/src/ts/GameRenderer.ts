import { Question } from "./Question";
export class GameRender {
	questions: Question[];
	points: number;
	constructor(questions: Question[]) {
		this.questions = questions;
		this.points = 0;
	}
	renderQuestionHTML(question: string, alternatives: string[]): string {
		return `<h1>${question}</h1> <div class="button-area">${this.renderAlternatives(
			alternatives
		)}</div>`;
	}
	renderAlternatives(alternatives: string[]): string {
		return alternatives
			.map(
				(alternative) =>
					`<button class="btn alternative btn-success">${alternative}</button>`
			)
			.join("");
	}
	placeQuestionsInQuestionbox(quiz: any) {
		const QuizContainer = document.querySelector(".quiz-area");
		if (!QuizContainer) throw new Error("No quiz-area");
		let content = "";
		if (!quiz) {
			content = this.finishedQuiz();
		} else {
			const { question, alternatives } = quiz;
			content = this.renderQuestionHTML(question, alternatives);
		}

		QuizContainer.innerHTML = content;
	}
	finishedQuiz(): string {
		const finishedText = `<h1>Quiz Completed</h1> <div class="button-area"><h2>Your Score: ${this.points}/${this.questions.length}</h2></div>`;
		this.points = 0;
		return finishedText;
	}
	validateAnswer = (userAnswer: string, correctAnswer: string) => {
		const score = document.querySelector(".score--state-count");
		if (!score) throw new Error("No Score Element");

		if (userAnswer === correctAnswer) {
			this.points++;
		}
	};
}
