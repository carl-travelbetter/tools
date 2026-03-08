console.log("Travelbetter Calorie Tracker");

/*
let accommodationTags = [];
let activeTags = [];
//Load Accommodation Tag data
fetch('/lib/tags/accommodation-tags.json')
  .then(response => response.json())
  .then(data => {
    accommodationTags = data;
    console.log("Accommodation Tags loaded:", accommodationTags);
    createAccommodationTagButtons(); // load tag buttons
  })
  .catch(error => console.error("Error loading accommodation tag data:", error));

let placesToStay = [];
let selectedPlaces = [];
//Load Accommodation Tag data
fetch('/lib/data/places-to-stay.json')
  .then(response => response.json())
  .then(data => {
    placesToStay = data;
    console.log("places data loaded:", placesToStay);
  })
  .catch(error => console.error("Error loading places data:", error));
*/

//Import Dom utils
import {getWrittenDate, getDuration, addDays} from "/lib/date-helper.js";
import { getEl, getText, getDate} from "/lib/dom.js";

//Load saved data
//Load Item List
const CALORIE_LIST_KEY = "calories-list";
let calorieList = JSON.parse(localStorage.getItem(CALORIE_LIST_KEY)) || {caloriesSpent: []};

//Load Limit
const CALORIE_LIMIT_KEY = "calorie-limit";
let limitData = JSON.parse(localStorage.getItem(CALORIE_LIMIT_KEY)) || {limitList: []};
let dailyCalorieLimit = limitData.limitList[0];

//If no limit set
if (isNaN(dailyCalorieLimit))
{
  dailyCalorieLimit = 1600;
}
 
//Load Running Total
const CALORIE_TOTAL_KEY = "calorie-total";
let totalData = JSON.parse(localStorage.getItem(CALORIE_TOTAL_KEY)) || {totalList: []};
let runningTotal = totalData.totalList[0];

//If no total set yet
if (isNan(runningTotal))
{
  runningTotal = 0;
}

//Setup default no value entered variable
const NOT_SET = "BLANK";

//Set events for button clicks in document (will be applied to all dom objects (pages) that call this js
function bindEvents() {
  getEl("whereto")?.addEventListener("input", searchForMatchingPlaces);
  getEl("save")?.addEventListener("click", saveAccommodation);
  getEl("cancel")?.addEventListener("click", cancel);
  getEl('delete')?.addEventListener("click", deleteAccommodation);
  getEl("duration")?.addEventListener("input", calcDepartureDate);
  getEl("departure-date")?.addEventListener("change", calcDuration);
  getEl("arrival-date")?.addEventListener("change", calcDuration);
  getEl("open-g-maps")?.addEventListener("click", openGoogleMaps);
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);
