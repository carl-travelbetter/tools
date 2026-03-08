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
  getEl('add-btn')?.addEventListener("click", addItem);
  getEl('open-limit-btn')?.addEventListener("click", openLimitControl);
  getEl('reset-btn')?.addEventListener("click", resetData);
  getEl('submit-btn')?.addEventListener("click", submitCalories);
  getEl('cancel-btn')?.addEventListener("click", cancelAddItem);
  getEl('set-limit-btn')?.addEventListener("change", setDailyLimit);
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);

//open add item controls
function addItem()
{
  console.log('Add Item');
  getEl('add-calories').hidden = false;
}

//Open the options to set or reset the daily calorie limit
function openLimitControl()
{
  console.log('Open Limit Controls');
  getEl('set-limit').hidden = false;
}

//Reset all data to defaults
function resetData()
{
  console.log('Reset All Data');
}

//function submit item/calorie update
function submitCalories()
{
  console.log('submit Calories');
  //Insert calorie adding code here
  getEl('add-calories').hidden = true;
}

//Cancel adding an item
function cancelAddItem()
{
  console.log('Cancel add item');
  getEl('add-calories').hidden = true;
}

//Set a new daily limit
function setDailyLimit()
{
  console.log('Set Daily Limit');
  dailyCalorieLimit = getEl('daily-limit').value;
  console.log('New Daily Calorie Limit '+dailyCalorieLimit);
  getEl('set-limit').hidden = true;
}

//Update the total and tracker
function updateTracker()
{
  //loop through all items and add up the calories
  let totalCaloriesConsumed = 0;
  calorieList.caloriesSpent.forEach (item => {
    let cal = parseFloat(item.calories);
    totalCaloriesConsumed += cal;
  });
  console.log('Total Calories Consumed '+totalCaloriesConsumed)
  let remainingBalance = dailyCalorieLimit - totalCaloriesConsumed;
  
  getEl('limit-check').hidden = true;
}
