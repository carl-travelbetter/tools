console.log("Guess The Number");

//iniitlise global variables
let targetNumber = 0;
let guess = 0;
let topOfRange = 10;
let bottomOfRange = 0;
let guessLimit = 5;
let guessCount = 0;
let guessesMade = [];

//load best score for user

//Call method to generate first target number
generateTargetNumber();
setValues();

//set the initial control values
function setValues()
{
  console.log("Set Values");
  const range = document.getElementById("range");
  range.innerHTML = "";
  range.innerHTML = "0.."+topOfRange;

  const guesses = document.getElementById("guesses");
  guesses.innerHTML = "";
  guesses.innerHTML = "Guess Limit "+guessLimit;

  //Reset guess count
  guessCount = 0;
}

//generate target number based on range
function generateTargetNumber()
{
  console.log("Generate Target Number");
  targetNumber = Math.floor(Math.random() * (topOfRange+1));
  console.log("Target Number "+targetNumber);
}

//submit a guess and see if it matches the target
function submitGuess()
{
  console.log("Submit Guess");
  const raw = document.getElementById("guess").value;
  //Check if blank entry
  if (!raw.trim()) 
  {
    showMessage('<p> Error - You must enter a number to play</p>', 'error');
    return;
  } // catches empty
  
  const guess = Number(raw);
  console.log("Guess entered "+guess);
  //Clear value entered
  document.getElementById("guess").value = "";
  if (!Number.isInteger(guess)) 
  { 
    showMessage('<p> Error - You must enter a whole number to play e.g. 4 not 4.5</p>', 'error');
    return;
  } // if you only want integers

  //Check if number is out of range
  if (guess > topOfRange)
  {
    showMessage('<p> Error - Only enter a number in the range 0..${topOfRange}</p>', 'error');
    return;
  }

  //If correct then 
  if (guess == targetNumber)
  {
    showMessage('<p> Correct - Well Done, time to try the next level!</p>', 'winningmessage');
  }
  else
  {

      guessCount++;
      guessesMade.push(guess);
      let guessesLeft = guessLimit - guessCount;
      if (guessesLeft == 0)
      {
        document.getElementById("results").hidden = true;
        showMessage('<p> No guesses left - bad luck, try again</p>', 'RESULT');
        startAgain();
      }
      else
      {
    
          
          if (higherOrLower())
          {
            showMessage('<p> Nope - Try Lower</p>', 'RESULT');            
          }
          else
          {
            showMessage('<p> Nope - Try Higher</p>', 'RESULT');          
          }
        
          let guessOutput = document.getElementById("guesses-left");
          guessOutput.textContent = "Guesses left "+guessesLeft;
          guessOutput.hidden = false;

          //output the previous guesses
          let previousGuesses = document.getElementById("guesses-made");
          previousGuesses.innerHTML = "Previous Guesses: "+guessesMade.toString();
          previousGuesses.hidden = false;
          
         
      }
  }
  
}



//Show an output message
function showMessage(message, type) 
{
  const results = document.getElementById("results");
  results.innerHTML = "";
  results.hidden = false;

  // Basic template; you can style by type later
  results.innerHTML = `
    <h2>Result</h2>
    <p class="${type}">${message}</p>
  `;
}

//determine hgher or lower for output
function higherOrLower()
{
  console.log("Higher or Lower");
  if (guess > targetNumber)
  {
    console.log("Too HIGH");
    return true;
  }
  else
  {
    console.log("Too LOW");
    return false;
  }
}

//share the results
function shareResults()
{
  console.log("Share results");
}

//Challenge a friend
function challengeAFriend()
{
  console.log("Challenge A Friend");
}

//increase guess count
function increaseGuessCount()
{
  console.log("Increase Guess Count");
}

//decrease guess count
function decreaseGuessCount()
{
  console.log("Decrease Guess Count");
}

//increase number range
function increaseNumberRange()
{
  console.log("Increase Number Range");
  topOfRange = Math.floor(topOfRange+5);
  console.log("New Top of Range = "+topOfRange);
  guessLimit = Math.floor((topOfRange / 2)+1);
  console.log("New Guess Limit = "+guessLimit);
  startAgain();
}

//decrease number range
function decreaseNumberRange()
{
  console.log("Decrease Number Range");
  if (topOfRange == 5)
  {
    alert("Range cannot go any lower");
    return;
  }
  topOfRange = Math.floor(topOfRange-5);
  console.log("New Top of Range = "+topOfRange);
  guessLimit = Math.floor((topOfRange / 2)+1);
  console.log("New Guess Limit = "+guessLimit);
  startAgain();
}

//Start again
function startAgain()
{
  console.log("Lets Start Again");
  guessesMade = [];
  document.getElementById("guesses-made").hidden = true;
  document.getElementById("results").hidden = true;
  document.getElementById("guesses-left").hidden = true;
  setValues(); 
  generateTargetNumber();
}
  
