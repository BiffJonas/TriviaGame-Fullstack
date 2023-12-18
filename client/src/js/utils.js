export const inputLinter = (input) => {
    if (typeof input !== "string")
        throw new Error("input must be string");
    const sanitizedInput = removeSpecial(input);
    const inputResult = sanitizedInput.trim().toLowerCase()[0].toUpperCase() +
        sanitizedInput.trim().slice(1).toLowerCase();
    return inputResult;
};
export const questionify = (question) => {
    let newString = removeSpecial(question);
    return newString + "?";
};
export const getElement = (className) => {
    const element = document.querySelector(`${className}`);
    if (!element)
        throw new Error(`Class ${className} not found`);
    return element;
};
export const removeSpecial = (input) => {
    const regex = /[?#()<>{}]/g;
    const newString = input.replace(regex, "");
    return newString;
};
export const getValue = (className) => {
    return getElement(className).value;
};
export const handleError = (error) => console.error(error);
export const initButtonListeners = (logic, buttons) => {
    //refactor into function with callback action and class name
    const buttonList = document.querySelectorAll(buttons);
    if (!buttonList)
        throw new Error("No button area");
    buttonList.forEach((button) => {
        button.addEventListener("click", logic);
    });
};
