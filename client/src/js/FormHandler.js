import { DbContext } from "./DbContext.js";
import { Question } from "./Question.js";
import { getValue, inputLinter, questionify, getElement } from "./utils.js";
class FormHandler {
    constructor() {
        this.adminMode = (event) => {
            const quizArea = getElement("quiz-area");
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
							<select class="quiz-catagory-input">
								<option value="Animals">Animals</option>
								<option value="Teachers">Teachers</option>
								<option value="Math">Math</option>
								<option value="All">All</option>
							</select>
							<button class="btn btn-primary" type="submit">Submit</button>
						</form>`;
            const quizForm = getElement("quizForm");
            quizForm.addEventListener("submit", this.handleFormSubmission);
        };
        this.handleFormSubmission = (event) => {
            event.preventDefault();
            const question = getValue("quiz-question-input");
            const answer = getValue("quiz-answer-input");
            const alternatives = getValue("quiz-alternatives-input");
            const catagory = getValue("quiz-catagory-input");
            //making sure all fields have a value
            if (!question || !answer || !alternatives || !catagory) {
                console.error("All fields are required.");
                return;
            }
            const questionfied = questionify(question);
            const lintedAnswer = inputLinter(answer);
            const lintedAlternatives = alternatives.split(",").map(inputLinter);
            const quizQuestion = new Question(0, questionfied, lintedAnswer, catagory, lintedAlternatives);
            const dbContext = new DbContext();
            dbContext.postNewQuestion(quizQuestion);
        };
    }
}
export default FormHandler;
