import { GameRender } from "./GameRenderer.js";
import { Gamehandler } from "./ActionHandler.js";
import { DbContext } from "./DbContext.js";
import { Question } from "./Question.js";
window.onload = async function () {
	const dbContext = new DbContext();
	const questions: Question[] = await dbContext.getAllQuestions();
	console.log(questions);

	const gameHandler = new Gamehandler(questions);
	const gameRender = new GameRender(questions, gameHandler);
	try {
		gameHandler.initEventListeners();
	} catch (error) {
		gameHandler.handleError(error);
	}
};
