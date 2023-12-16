export const inputLinter = (input: string): string => {
	if (typeof input !== "string") throw new Error("input must be string");
	const sanitizedInput = removeSpecial(input);
	const inputResult =
		sanitizedInput.trim().toLowerCase()[0].toUpperCase() +
		sanitizedInput.trim().slice(1).toLowerCase();

	return inputResult;
};
export const questionify = (question: string): string => {
	let newString = removeSpecial(question);
	return newString + "?";
};
export const getElement = (className: string) => {
	const element = document.querySelector(`.${className}`);
	if (!element) throw new Error(`Class ${className} not found`);

	return element;
};
export const removeSpecial = (input: string): string => {
	const regex = /[?#()<>{}]/g;
	const newString = input.replace(regex, "");
	return newString;
};
export const getValue = (className: string): string => {
	return (getElement(className) as HTMLInputElement).value;
};
export const handleError = (error: any) => console.error(error);
