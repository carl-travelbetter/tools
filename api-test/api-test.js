/*const response = await fetch("https://travelbetter-api-mv8e.onrender.com/");

const data = await response.json();

console.log(data.message);*/
console.log('Double Numbers JS');

//Set events for button clicks in document (will be applied to all dom objects (pages) that call this js
function bindEvents() {
  console.log('Bind Events');
  document.getElementById('submit-btn')?.addEventListener("click", doubleNumbers);
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);


//Double the numbers and return the result
async function doubleNumbers()
{
    console.log('Double Numbers');
    let number = Number(document.getElementById("num").value);
    console.log('Number Entered = '+number);
    const doublenumber = await fetch(`https://travelbetter-api-mv8e.onrender.com/double?number=${number}`);

    const answer = await doublenumber.json();

    console.log(answer.result);
    
    const output = document.getElementById("results");
    output.innerHTML = `<p>Answer is ${answer.result} </p>`;
    output.hidden = false;    
}




