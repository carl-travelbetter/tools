console.log('BMR - TDEE - Calculator');

//Import Dom utils
import {getWrittenDate, getDuration, addDays} from "/lib/date-helper.js";
import { getEl, getText, getDate} from "/lib/dom.js";

//Set events for button clicks in document (will be applied to all dom objects (pages) that call this js
function bindEvents() {
  getEl('calculate-btn')?.addEventListener("click", calculateBMRTDEE);
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);

let BMR = 0;
let TDEE = 0;

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
    BMR = (weight*10) + (6.25 * height) - (5 * age) - 161; 
    TDEE = BMR * activityLevel;
  }
  else if (sexatbirth == "Male")
  {
    console.log('Caulcating BMR and TDEE for a Male');
    BMR = (weight*10) + (6.25 * height) - (5 * age) + 5;
    TDEE = BMR * activityLevel;
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
  console.log('Display Results');
  const results = getEl('results');
  results.innerHTML = `<h2>Results</h2>`+
                      `<p>BMR = ${BMR}</p>`+
                      `<p>TDEE = ${TDEE}</p>`;
  results.hidden = false;
}
