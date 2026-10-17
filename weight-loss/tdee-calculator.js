console.log('TDEE - Calculator');

//Import Dom utils
import {getWrittenDate, getDuration, addDays} from "/lib/date-helper.js";
import { getEl, getText, getDate} from "/lib/dom.js";

//Set events for button clicks in document (will be applied to all dom objects (pages) that call this js
function bindEvents() {
  getEl('calculate-btn')?.addEventListener("click", calculateBMRTDEE);
  setupActivityButtons();
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);

let BMR = 0;
let TDEE = 0;
let activityLevel = 1.2;

//Setup the activity buttons with values and active controls
function setupActivityButtons()
{
  console.log('Setup Activity Buttons');
  const extremeActiveBtn = getEl('ext-act-level');
  const veryActiveBtn = getEl('very-act-level');
  const modActiveBtn = getEl('mod-act-level');
  
  extremeActivityBtn.addEventListener("click", () => {
    extremeActivityBtn.classList.toggle("active");
    veryActiveBtn.classList.remove("active");
    modActiveBtn.classList.remove("active");
    activityLevel = 1.9;
    console.log('Activity Level Set To '+activityLevel);
  });

   veryActiveBtn.addEventListener("click", () => {
    veryActiveBtn.classList.toggle("active");
    extremeActivityBtn.classList.remove("active");
    modActiveBtn.classList.remove("active");
    activityLevel = 1.725;
    console.log('Activity Level Set To '+activityLevel);
  });

   modActiveBtn.addEventListener("click", () => {
    modActiveBtn.classList.toggle("active");
    extremeActivityBtn.classList.remove("active");
    veryActiveBtn.classList.remove("active");
    activityLevel = 1.55;
    console.log('Activity Level Set To '+activityLevel);
  });

  
}

function calculateBMRTDEE()
{
  console.log('Calculating BMR and TDEE');
  let weight = Number(getEl('weight').value);
  let height = Number(getEl('height').value);
  let age = Number(getEl('age').value);
  let sexatbirth = getEl('sexatbirth').value;
  let activityLevel = Number(getEl('activity-level').value);
  if (sexatbirth == "Female")
  {
    console.log('Calculating BMR and TDEE for a Female');
    BMR = Math.round((weight*10) + (6.25 * height) - (5 * age) - 161); 
    TDEE = Math.round(BMR * activityLevel);
  }
  else if (sexatbirth == "Male")
  {
    console.log('Caulcating BMR and TDEE for a Male');
    BMR = Math.round((weight*10) + (6.25 * height) - (5 * age) + 5);
    TDEE = Math.round(BMR * activityLevel);
  }
  else
  {
    console.log('No Sex Selected');
  }
  
  displayResults();
}

//Display the results
function displayResults()
{
  //calculate some reduction values to display
  let averageCalorieIntake = Math.round((BMR + TDEE) / 2);
  let tenPercentAverage = Math.round(averageCalorieIntake - (averageCalorieIntake*0.1));  
  let tenPercentBMR = Math.round(BMR - (BMR*0.1));
  console.log('Display Results');
  const results = getEl('results');
  results.innerHTML = `<h2>BMR and TDEE Results</h2>`+
                      `<p><center><strong>BMR = ${BMR}</strong></center></p>`+
                      `<p><center><strong>TDEE = ${TDEE}</strong></center></p>`+
                      `<h3>How to use this information for weight loss</h3>`+
                      `<p>If you were to take an average of the two values to work out approximate daily need - this is <strong> ${averageCalorieIntake}</strong> Calories</p>`+
                      `<p>If you then wanted to target a 10% reduction in daily calories to support weight loss then set your daily limit to<strong> ${tenPercentAverage}</strong> Calories</p>`+
                      `<p>Alternatively, if you just wanted to set your limit of your BMR then a 10% reduction would mean setting your limit to <strong> ${tenPercentBMR}</strong></p>`;
  results.hidden = false;
}
