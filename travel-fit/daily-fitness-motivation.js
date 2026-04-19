console.log('Daily Fitness Motivation - Travelbetter');

//Import Dom utils
import {getWrittenDate, getDuration, addDays, getDayOfYear} from "/lib/date-helper.js";
import {getEl, getText, getDate} from "/lib/dom.js";

//Load the JSON Motivation File
let motivationData = [];

fetch('daily-fitness-motivation.json')
  .then(response => response.json())
  .then(data => {
    motivationData = data;
    console.log("Motivation data loaded:", motivationData);
    loadDailyMotivation();
  })
  .catch(error => console.error("Error loading motivation data:", error));

//Load State Data
//Do I track the lists and if empty assume not done or have a state element that resets, does it need a date?
//If I store a list of state objects this allows for expansion, even customisation,
//It will need a date value or similar to reset - date day?
const CALORIE_TRACKING_DAY = "calorie-tracking-day";
let calTrackingDay = JSON.parse(localStorage.getItem(CALORIE_TRACKING_DAY)) || {trackingDay: []};

//Load Walk day
const WALK_TRACKING_DAY = "walk-tracking-day";
let walkTrackingDay = JSON.parse(localStorage.getItem(WALK_TRACKING_DAY)) || {trackingDay: []};

//Lets work with days first...

let dayOfYear = getDayOfYear();


//Find and display the motivation data for today
function loadDailyMotivation()
{
  console.log('Loading Daily Motivation for Day '+dayOfYear);
  const motivation = motivationData.find(entry => entry.day === dayOfYear);
  const card = getEl('daily-motivation');
  if (motivation) 
  {
      const header = document.createElement('h3');
      header.textContent = "Daily Fitness Motivation";
      card.appendChild(header);
      const statement = document.createElement('p');
      statement.textContent = motivation.motivation;
      card.appendChild(statement);
  } 
  else 
  {
      const errorMessage = document.createElement('p');
      errorMessage.textContent = "Unable to load motivation - take the day off";
  }
}
