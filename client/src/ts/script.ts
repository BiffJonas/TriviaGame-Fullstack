import { GameRender } from "./GameRenderer.js";
import { Gamehandler } from "./ActionHandler.js";
import { DbContext } from "./DbContext.js";
import { Question } from "./Question.js";
window.onload = async function () {
	const dbContext = new DbContext();
	const questions: Question[] = await dbContext.fetchData();
	console.log(questions);

	const gameRender = new GameRender(questions);
	const gamehandler = new Gamehandler(gameRender, questions);
	try {
		gamehandler.initEventListeners();
	} catch (error) {
		gamehandler.handleError(error);
	}
};
