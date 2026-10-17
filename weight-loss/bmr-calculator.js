console.log('BMR - Calculator');

//Import Dom utils
import {getWrittenDate, getDuration, addDays} from "/lib/date-helper.js";
import { getEl, getText, getDate} from "/lib/dom.js";

//Set events for button clicks in document (will be applied to all dom objects (pages) that call this js
function bindEvents() {
  getEl('calculate-btn')?.addEventListener("click", calculateBMR);
  getEl('save-button')?.addEventListener("click", saveBMR);
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);

let BMR = 0;

//Load Limit
const CALORIE_LIMIT_KEY = "calorie-limit";
let limitData = JSON.parse(localStorage.getItem(CALORIE_LIMIT_KEY)) || {limitList: []};
let dailyCalorieLimit = limitData.limitList[0];

//Load Limit
const BMR_LIMIT_KEY = "current-bmr";
let BMRData = JSON.parse(localStorage.getItem(BMR_LIMIT_KEY)) || {bmrList: []};
let currentBMR = Number(BMRData.bmrList[0]);

function calculateBMR()
{
  console.log('Calculating BMR');
  let weight = Number(getEl('weight').value);
  let height = Number(getEl('height').value);
  let age = Number(getEl('age').value);
  let sexatbirth = getEl('sexatbirth').value;
 
  if (sexatbirth == "Female")
  {
    console.log('Calculating BMR for a Female');
    BMR = Math.round((weight*10) + (6.25 * height) - (5 * age) - 161); 
  }
  else if (sexatbirth == "Male")
  {
    console.log('Caulcating BMR for a Male');
    BMR = Math.round((weight*10) + (6.25 * height) - (5 * age) + 5);
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
  let tenPercentBMR = Math.round(BMR - (BMR*0.1));
  console.log('Display Results');
  const results = getEl('results');
  results.innerHTML = `<h2>BMR Results</h2>`+
                      `<p><center><strong>BMR = ${BMR}</strong></center></p>`+
                      `<h3>How to use this information for weight loss</h3>`+
                      `<p>If you want to set your limit of your BMR then a 10% reduction would mean setting your limit to <strong> ${tenPercentBMR}</strong></p>`;
  results.hidden = false;
  getEl('save').hidden = false;
}

//save the BMR data
function saveBMR()
{
  console.log('Saving BMR data');
  BMRData.bmrList[0] = BMR;
  saveData();
}

//Save data
function saveData()
{
  console.log("Saving Data...");
  localStorage.setItem(CALORIE_LIMIT_KEY, JSON.stringify(limitData));
  localStorage.setItem(BMR_LIMIT_KEY, JSON.stringify(BMRData));
}
