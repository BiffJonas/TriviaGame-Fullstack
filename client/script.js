const root = document.getElementById("root");
fetch("https://localhost:7076/api/triviagame")
	.then((data) => data.json())
	.then((data) => (root.textContent = data[2].question));
