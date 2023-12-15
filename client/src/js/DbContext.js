var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class DbContext {
    constructor() {
        this.url = "https://localhost:7076/api/triviagame/";
        this.getAllQuestions = () => __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.url);
            if (!response.ok)
                throw new Error("Failed fetching data");
            return response.json();
        });
        this.getCatagoryQuestions = (catagory) => __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.url + "catagory/" + catagory);
            if (!response.ok)
                throw new Error("failed fetching catagory");
            return yield response.json();
        });
        this.getShuffledQustions = () => __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.url + "shuffle");
            if (!response.ok)
                throw new Error("Failed fetching shuffled questions");
            return response.json();
        });
        this.getQuestionById = (id) => __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.url + id);
            if (!response.ok) {
                throw new Error(`Failed to fetch question with id: ${id}`);
            }
            return yield response.json();
        });
        this.postNewQuestion = (question) => __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.url + "addcard", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(question),
            });
            if (!response.ok)
                throw new Error("failed posting new question");
        });
        this.checkAnswer = (body) => __awaiter(this, void 0, void 0, function* () {
            //Wrong here
            const response = yield fetch(this.url + "validate", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(body),
            });
            if (!response.ok)
                throw new Error("Failed to send response");
            return yield response.json();
        });
    }
}
