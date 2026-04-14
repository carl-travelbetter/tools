console.log('Travel Fit Tracker');

//Import Dom utils
import {getWrittenDate, getDuration, addDays, getDayOfYear} from "/lib/date-helper.js";
import {getEl, getText, getDate} from "/lib/dom.js";

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

console.log("This is day "+getDayOfYear());
//You will need to handle end of year events ultimately.
let yesterday = getDayOfYear() - 1;
if (yesterday < 0)
{ yesterday = 365; }

console.log('Yesterday '+yesterday);

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", updateTrackers);

function updateTrackers()
{
  updateCalorieTracker();
  updateWalkTracker();
}

//Update the calorie tracker circle if the last calorie update date is today
function updateCalorieTracker()
{
  const calorieCircle = getEl('calorie-circle');
  let lastCalorieUpdate = calTrackingDay.trackingDay[0] || 999;
  if (lastCalorieUpdate == getDayOfYear())
  {
    calorieCircle.setAttribute("fill", "green");
  }
  else
  {
    calorieCircle.setAttribute("fill", "red");
  }
}

//Update the calorie tracker circle if the last calorie update date is today
function updateWalkTracker()
{
  const walkCircle = getEl('walk-circle');
  let lastWalkUpdate = walkTrackingDay.trackingDay[0] || 999;
  if (lastWalkUpdate == getDayOfYear())
  {
    walkCircle.setAttribute("fill", "green");
  }
  else
  {
    walkCircle.setAttribute("fill", "red");
  }
}

//State logic will need to review the state list that says done for yesterday and turn red, in the actual trackers you will need to update the day to today on the first entry saved or even all entries saved. 
//Perhaps working in a transient day state e.g. does it show state of done for today, if so ignore then otherwise save
//Favour seperate states but does it need anything more than the right day - not even a done or not done as the day has been updated 
