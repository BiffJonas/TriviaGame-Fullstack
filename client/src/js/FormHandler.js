import { DbContext } from "./DbContext.js";
import QuestionFormData from "./QuestionFormData.js";
import { getElement } from "./utils.js";
class FormHandler {
    constructor() {
        this.adminMode = (event) => {
            const quizArea = getElement(".quiz-area");
            quizArea.innerHTML = `<form class="quizForm">
							<h1>Create new question</h1>
							<h5>question</h5>
							<input
								class="quiz-question-input"
								type="text"
                                name="question"
							/>
							<h5>answer</h5>
							<input
								class="quiz-answer-input"
								type="text"
                                name="answer"
							/>
							<h5>alternatives</h5>
                            <button class="add-alternative btn btn-warning"
                            type="button">
                                Add Alternative
                            </button>
                            <div class="alternative-box"></div>

							<h5>catagory</h5>
                            <div>
							<select class="quiz-catagory-input" name="catagory">
								<option value="Animals">Animals</option>
								<option value="Teachers">Teachers</option>
								<option value="Math">Math</option>
								<option value="All">All</option>
							</select>
							<button class="btn btn-primary" type="submit">Submit</button>
                            </div>
						</form>`;
            const quizForm = getElement(".quizForm");
            const altBox = getElement(".add-alternative");
            altBox.addEventListener("click", this.addAlternative);
            quizForm.addEventListener("submit", this.handleFormSubmission);
        };
        this.handleFormSubmission = (event) => {
            event.preventDefault();
            //special characters cant be linted.
            const formData = this.getInputValues().lintFormData();
            console.log(formData);
            const dbContext = new DbContext();
            dbContext.postNewQuestion(formData);
        };
        this.getInputValues = () => {
            const form = getElement(".quizForm");
            if (!form || !form.checkValidity()) {
                throw new Error("All fields are required");
            }
            return new QuestionFormData(form);
        };
        this.addAlternative = () => {
            const alternativeBox = getElement(".alternative-box");
            alternativeBox.insertAdjacentHTML("beforeend", `<input class="alt-input">`);
        };
    }
}
export default FormHandler;
