import { GameRender } from "./GameRenderer.js";
import { Gamehandler } from "./ActionHandler.js";
import { DbContext } from "./DbContext.js";
import { Question } from "./Question.js";
import { handleError } from "./utils.js";
window.onload = async function () {
	const gameHandler = new Gamehandler();
	const gameRender = new GameRender(gameHandler);
	try {
		gameHandler.initEventListeners();
	} catch (error) {
		handleError(error);
	}
};
