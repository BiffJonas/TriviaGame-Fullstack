var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GameRender } from "./GameRenderer.js";
import { Gamehandler } from "./ActionHandler.js";
import { DbContext } from "./DbContext.js";
window.onload = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const dbContext = new DbContext();
        const questions = yield dbContext.getAllQuestions();
        console.log(questions);
        const gameHandler = new Gamehandler(questions);
        const gameRender = new GameRender(questions, gameHandler);
        try {
            gameHandler.initEventListeners();
        }
        catch (error) {
            gameHandler.handleError(error);
        }
    });
};
