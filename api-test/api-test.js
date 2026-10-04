const response = await fetch("https://travelbetter-api-mv8e.onrender.com/");

const data = await response.json();

console.log(data.message);
