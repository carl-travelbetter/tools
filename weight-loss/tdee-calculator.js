console.log('TDEE - Calculator');

//Import Dom utils
import {getWrittenDate, getDuration, addDays} from "/lib/date-helper.js";
import { getEl, getText, getDate} from "/lib/dom.js";

//Load Limit
const CALORIE_LIMIT_KEY = "calorie-limit";
let limitData = JSON.parse(localStorage.getItem(CALORIE_LIMIT_KEY)) || {limitList: []};
let dailyCalorieLimit = limitData.limitList[0];

//Load Limit
const BMR_LIMIT_KEY = "current-bmr";
let BMRData = JSON.parse(localStorage.getItem(BMR_LIMIT_KEY)) || {bmrList: []};
let currentBMR = Number(BMRData.bmrList[0]);

//Load Limit
const TDEE_LIMIT_KEY = "current-tdee";
let TDEEData = JSON.parse(localStorage.getItem(TDEE_LIMIT_KEY)) || {tdeeList: []};
let currentTDEE = Number(TDEEData.tdeeList[0]);

//Set events for button clicks in document (will be applied to all dom objects (pages) that call this js
function bindEvents() {
  getEl('calculate-btn')?.addEventListener("click", calculateBMRTDEE);
  getEl('used-saved-btn')?.addEventListener("click", useSavedBMR);
  getEl('calculate-tdee-btn')?.addEventListener("click", calculateTDEE);
  getEl('save-button')?.addEventListener("click", saveBMRTDEE);
  getEl('set-calorie-limit')?.addEventListener("click", setCalorieLimit);
  setupActivityButtons();
  checkForCurrentBMRTDEE();
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);

let BMR = 0;
let TDEE = 0;
let calorieDeficit = 0;
let activityLevel = 1.2;

//Check for a saved BMR and TDEE
function checkForCurrentBMRTDEE()
{
  console.log('Current BMR Check');
  if (isNaN(currentBMR))
  {
    console.log('No BMR Saved');
  }
  else
  {
    if (currentBMR > 0)
    {
      BMR = currentBMR;
      let usedBMR = getEl('saved-value');
      usedBMR.innerHTML = `<p>Saved BMR: <strong>${BMR}</strong></p>`;
      getEl('use-saved').hidden = false;
    }
  }
}

//Setup the activity buttons with values and active controls
function setupActivityButtons()
{
  console.log('Setup Activity Buttons');
  const extremeActiveBtn = getEl('ext-act-level');
  const veryActiveBtn = getEl('very-act-level');
  const modActiveBtn = getEl('mod-act-level');
  const gentlActiveBtn = getEl('gentl-act-level');
  const sedActiveBtn = getEl('sed-act-level');
  
  extremeActiveBtn.addEventListener("click", () => {
    extremeActiveBtn.classList.toggle("active");
    veryActiveBtn.classList.remove("active");
    modActiveBtn.classList.remove("active");
    gentlActiveBtn.classList.remove("active");
    sedActiveBtn.classList.remove("active");
    activityLevel = 1.9;
    console.log('Activity Level Set To '+activityLevel);
  });

   veryActiveBtn.addEventListener("click", () => {
    veryActiveBtn.classList.toggle("active");
    extremeActiveBtn.classList.remove("active");
    modActiveBtn.classList.remove("active");
    gentlActiveBtn.classList.remove("active");
    sedActiveBtn.classList.remove("active");
    activityLevel = 1.725;
    console.log('Activity Level Set To '+activityLevel);
  });

   modActiveBtn.addEventListener("click", () => {
    modActiveBtn.classList.toggle("active");
    extremeActiveBtn.classList.remove("active");
    veryActiveBtn.classList.remove("active");
    gentlActiveBtn.classList.remove("active");
    sedActiveBtn.classList.remove("active");
    activityLevel = 1.55;
    console.log('Activity Level Set To '+activityLevel);
  });

  gentlActiveBtn.addEventListener("click", () => {
    gentlActiveBtn.classList.toggle("active");
    extremeActiveBtn.classList.remove("active");
    veryActiveBtn.classList.remove("active");
    modActiveBtn.classList.remove("active");
    sedActiveBtn.classList.remove("active");
    activityLevel = 1.375;
    console.log('Activity Level Set To '+activityLevel);
  });

  sedActiveBtn.addEventListener("click", () => {
    sedActiveBtn.classList.toggle("active");
    extremeActiveBtn.classList.remove("active");
    veryActiveBtn.classList.remove("active");
    modActiveBtn.classList.remove("active");
    gentlActiveBtn.classList.remove("active");
    activityLevel = 1.2;
    console.log('Activity Level Set To '+activityLevel);
  });

  
}

//change the layout to use saved BMR
function useSavedBMR()
{
  console.log('Using Saved BMR');
  getEl('calculator').hidden = true;
  getEl('used-saved-calculator').hidden = false;
}

//Calculate TDEE only - using saved BMR
function calculateTDEE()
{
  console.log('Calculating TDEE');
  TDEE = Math.round(BMR * activityLevel);
  calorieDeficit = TDEE - 500;
  displayResults();
}


//Calculate BMR and TDEE
function calculateBMRTDEE()
{
  console.log('Calculating BMR and TDEE');
  let weight = Number(getEl('weight').value);
  let height = Number(getEl('height').value);
  let age = Number(getEl('age').value);
  let sexatbirth = getEl('sexatbirth').value;
 
  if (sexatbirth == "Female")
  {
    console.log('Calculating BMR and TDEE for a Female');
    BMR = Math.round((weight*10) + (6.25 * height) - (5 * age) - 161); 
    TDEE = Math.round(BMR * activityLevel);
    calorieDeficit = TDEE - 500;
  }
  else if (sexatbirth == "Male")
  {
    console.log('Caulcating BMR and TDEE for a Male');
    BMR = Math.round((weight*10) + (6.25 * height) - (5 * age) + 5);
    TDEE = Math.round(BMR * activityLevel);
    calorieDeficit = TDEE - 500;
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
  const deficitPane = getEl('deficit');
  deficitPane.innerHTML = `<p>Now you know your Total Daily Energy Expenditure (TDEE), you can use it to set a daily calorie target for weight loss.</p>`+
                          `<p>A common starting point is to subtract 500 calories from your TDEE as your target.</p>`+
                          `<p>A 500 per day calorie reduction will result in approximately 1lb (roughly half a kilogram) weight loss per week.</p>`+
                          `<p>Based on your <strong>TDEE of ${TDEE}</strong> your calorie limit should be set to <strong>${calorieDeficit}</strong>.</p>`+
                          `<p><i>Note: This is an estimated start point rather than a guarantee, and your calorie needs will change as you lose weight so revisit this calculation throughout your weight loss journey</i></p>`;
  deficitPane.hidden = false;
  getEl('more-options').hidden = false;
  getEl('save-bmr-tdee').hidden = false;
  getEl('set-calories').hidden = false;
  getEl('saved-bmr-tdee').hidden = true;
  getEl('calories-set').hidden = true;
}

//function to save the BMR and TDEE
function saveBMRTDEE()
{

  console.log('Saving BMR & TDEE data');
  BMRData.bmrList[0] = BMR;
  TDEEData.tdeeList[0] = TDEE;
  saveData();
}

//Save data
function saveData()
{
  console.log("Saving Data...");
  localStorage.setItem(BMR_LIMIT_KEY, JSON.stringify(BMRData));
  localStorage.setItem(TDEE_LIMIT_KEY, JSON.stringify(TDEEData)); 
  getEl('save-bmr-tdee').hidden = true;
  getEl('saved-bmr-tdee').hidden = false;
}

//Save data
function setCalorieLimit()
{
  console.log("Setting Calorie Limit...");
  limitData.limitList[0] = calorieDeficit;  
  localStorage.setItem(CALORIE_LIMIT_KEY, JSON.stringify(limitData));
  getEl('set-calories').hidden = true;
  getEl('calories-set').hidden = false;
}
