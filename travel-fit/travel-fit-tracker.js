console.log('Travel Fit Tracker');

//Import Dom utils
import {getWrittenDate, getDuration, addDays, getDayOfYear} from "/lib/date-helper.js";
import {getEl, getText, getDate} from "/lib/dom.js";

//Load State Data
//Do I track the lists and if empty assume not done or have a state element that resets, does it need a date?
//If I store a list of state objects this allows for expansion, even customisation,
//It will need a date value or similar to reset - date day?
//const CALORIE_TRACKING_STATE_KEY = "travel-fit-states";
//let tfStoredStates = JSON.parse(localStorage.getItem(TRAVEL_FIT_STATE_KEY)) || {tfStates: []};

//Lets work with days first...

console.log("This is day "+getDayOfYear());
//You will need to handle end of year events ultimately.
let yesterday = getDayOfYear() - 1;
if (yesterday < 0)
{ yesterday = 365; }

console.log('Yesterday '+yesterday);
/*
function getDayOfYear(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0); // Jan 0 = last day of previous year
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}*/
