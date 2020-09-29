let inputText = document.getElementById('input_text');
const button = document.getElementById('ls-button');

button.addEventListener("click", () => {
	let name = inputText.value;
	console.log(name);
	localStorage.setItem("username",name);
	
});



