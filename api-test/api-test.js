const response = await fetch("https://travelbetter-api-mv8e.onrender.com/");

const data = await response.json();

console.log(data.message);

const number = 5;

const doublenumber = await fetch(
    `https://travelbetter-api-mv8e.onrender.com/double?number=${number}`
);

const answer = await doublenumber.json();

console.log(answer.result);

const output = document.getElementById("results");
output.innerHTML = "";
output.innerHTML = `<p>Answer is ${answer.result} </p>`;


