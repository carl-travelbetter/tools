console.log("Travelbetter Calorie Tracker");

//global variables
let foodName;
let caloriesPer100g = 0;
let calories = 0;

//Import Dom utils
import {getWrittenDate, getDuration, addDays, getDayOfYear} from "/lib/date-helper.js";
import { getEl, getText, getDate} from "/lib/dom.js";

//Load saved data
//Load Item List
const CALORIE_LIST_KEY = "calories-list";
let calorieList = JSON.parse(localStorage.getItem(CALORIE_LIST_KEY)) || {caloriesSpent: []};

//Load Limit
const CALORIE_LIMIT_KEY = "calorie-limit";
let limitData = JSON.parse(localStorage.getItem(CALORIE_LIMIT_KEY)) || {limitList: []};
let dailyCalorieLimit = limitData.limitList[0];

//Load calorie day
const CALORIE_TRACKING_DAY = "calorie-tracking-day";
let calTrackingDay = JSON.parse(localStorage.getItem(CALORIE_TRACKING_DAY)) || {trackingDay: []};

const dayOfYear = getDayOfYear();

let dayCheck  = Num(calTrackingDay.trackingDay[0]) || 0;

if (dayCheck < dayOfYear) || (dayCheck > dayOfYear)
{
  console.log('Its a New Day - Removing Old Log');
  startNewDay();
} 
else
{
  console.log('Not a new day');
}

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
if (isNaN(runningTotal))
{
  runningTotal = 0;
}

if (calorieList.caloriesSpent.length > 0)
{  
  displayLog(); 
  updateTracker();
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
  getEl('set-limit-btn')?.addEventListener("click", setDailyLimit);
  getEl('exit-btn')?.addEventListener("click", exitTracker);
  getEl('new-day-btn')?.addEventListener("click", startNewDay);
  getEl('display-tracker-btn')?.addEventListener("click", updateTracker);
  getEl('show-log-btn')?.addEventListener("click", displayLog);
  getEl('food-lookup')?.addEventListener("click", openFoodLookup);
  getEl('food-search-btn')?.addEventListener("click", searchForFood);
  getEl('calories-per-grams')?.addEventListener("click", searchGrams);
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);

//Asynchonous function to look food based on query
async function searchProducts(query) {
  const url = `https://world.openfoodfacts.net/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=5&fields=product_name,brands,nutriments`;

  const controller = new AbortController();

  // Timeout after 5 seconds
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 5000);

  try {
    const res = await fetch(url, {
      signal: controller.signal
    });

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
      foodLookupError();
    }

    const data = await res.json();

    return data.products || [];

  } catch (error) {

    if (error.name === "AbortError") {
      console.error("Request timed out");
    } else {
      console.error("API error:", error);
    }
    foodLookupError
    return [];

  } finally {
    clearTimeout(timeoutId);
  }
}

//food lookup error
function foodLookupError()
{
  alert('Apologies, someting has gone wrong with the food lookup. Sorry for the inconvienance');
  getEl('searching').hidden = true;
  openFoodLookup();
}


//open add item controls
function addItem()
{
  console.log('Add Item');
  getEl('item-name').value = "";
  getEl('calories').value = "";
  getEl('add-calories').hidden = false;
}

//Open the options to set or reset the daily calorie limit
function openLimitControl()
{
  console.log('Open Limit Controls');
  getEl('daily-limit').value = dailyCalorieLimit;
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
  let item = {};
  item.description = getEl('item-name').value || NOT_SET;
  item.calories = getEl('calories').value || 0;
  calorieList.caloriesSpent.push(item);
  calTrackingDay.trackingDay[0] = dayOfYear;
  saveData();
  updateTracker();
  displayLog();
  getEl('add-calories').hidden = true;
  getEl('item-name').value = "";
  getEl('calories').value = "";
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
  limitData.limitList[0] = dailyCalorieLimit;
  
  saveData();
  updateTracker();
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
  const limitCheckDiv = getEl('limit-check');
  limitCheckDiv.innerHTML = "";
  let remainingBalance = dailyCalorieLimit - totalCaloriesConsumed;
  const balanceSum = document.createElement('p');
  //Need to assign the class based on how close to the limit it is
  let percentageUsed = (totalCaloriesConsumed / dailyCalorieLimit) * 100;
  console.log('Percentage Used '+percentageUsed);
  if (percentageUsed < 61)
  { 
    console.log('In the Green'); 
    balanceSum.className = 'in-the-green';
  }
  if ((percentageUsed > 60) && (percentageUsed < 86 )) 
  { 
    console.log('In the Amber'); 
    balanceSum.className = 'in-the-amber';
  }
  if ((percentageUsed > 85) && (percentageUsed < 101))
  { 
    console.log('In the Red'); 
    balanceSum.className = 'in-the-red';
  }
  balanceSum.textContent = "Limit "+dailyCalorieLimit+" - Total Consumed "+totalCaloriesConsumed+" = "+remainingBalance+" remaining";
  limitCheckDiv.appendChild(balanceSum);
  limitCheckDiv.hidden = false;
}

//display the entries made so far
function displayLog()
{
  console.log('Display Log');
  //Add code to go through and display each entry
  //Need to have a delete option created, a bit like the list work done before 
  const dailyLog = getEl('daily-log');
  dailyLog.innerHTML = "";
  const list = document.createElement('ul');

  //Create a header row for the list
  const listHeader = document.createElement('li');
  const listHeaderID = document.createElement('span');
  listHeaderID.className = 'span-id';
  listHeaderID.textContent = 'Item';
  listHeader.appendChild(listHeaderID);
  const listHeaderItem = document.createElement('span');
  listHeaderItem.className = 'span-text';
  listHeaderItem.textContent = 'Description';
  listHeader.appendChild(listHeaderItem);
  const listHeaderValue = document.createElement('span');
  listHeaderValue.className = 'span-value';
  listHeaderValue.textContent = 'Calories';
  listHeader.appendChild(listHeaderValue);
  const listHeaderAction = document.createElement('span');
  listHeaderAction.className = 'span-action';
  listHeaderAction.textContent = 'Delete Item';
  listHeader.appendChild(listHeaderAction);

  list.appendChild(listHeader);
  
  
  let idx = 0;
  calorieList.caloriesSpent.forEach (item => {
    idx++; 
    let listItem = document.createElement('li');
    //listItem.textContent = item.description+': '+item.calories;
    let listID = document.createElement('span');
    listID.className = 'span-id';
    listID.textContent = ""+idx;
    listItem.appendChild(listID);
    let listDescription = document.createElement('span');
    listDescription.className = 'span-text';
    listDescription.textContent = item.description;
    listItem.appendChild(listDescription);
    let listCalories = document.createElement('span');
    listCalories.className = 'span-value';
    listCalories.textContent = item.calories;
    listItem.appendChild(listCalories);
    let listDeleteControl = document.createElement('span');
    listDeleteControl.className = 'span-action';
    
    //create a delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.setAttribute("data-label", idx-1);
      //Make the button do something
       //Make the button do something when clicked
      deleteButton.addEventListener("click", () => {
      
      console.log("Delete Expense Button Clicked");
      console.log("Delete ID = "+deleteButton.dataset.label);   
      calorieList.caloriesSpent.splice(deleteButton.dataset.label, 1); 
      saveData();  
      updateTracker();
      displayLog();
      });
      listDeleteControl.appendChild(deleteButton);
      listItem.appendChild(listDeleteControl);
      list.appendChild(listItem);
  });
  dailyLog.appendChild(list);
  dailyLog.hidden = false;
}

//open the foodlookup tool
function openFoodLookup()
{
  console.log('Food Lookup');
  getEl('food-name').value = "";
  getEl('food-lookup-card').hidden = false;
}

//search for a food using the OpenFood DB
function searchForFood()
{
  console.log('search for food');
  foodName = getEl('food-name').value;
  console.log('Searching for...'+foodName);
  getEl('searching').hidden = false;
  searchProducts(foodName).then(results => {
  try
  {  
    caloriesPer100g = results[1].nutriments["energy-kcal_100g"];  
    console.log(caloriesPer100g);
    displayFoodSearchResult();
  }
  catch (err)
  {  
    console.log('Error Processing Food Lookup Results');
    alert('Sorry, we were not able to find that food. Please check the search term and try again.');
    getEl('searching').hidden = true;
    getEl('food-lookup-card').hidden = false;
  }
  });
}

//Display the results of the food look up search
function displayFoodSearchResult()
{
  console.log('Display Food Search Result');
  getEl('searching').hidden = true;
  const foodSearchResult = getEl('food-search-result');
  foodSearchResult.innerHTML = "";
  const header = document.createElement('h2');
  header.textContent = "Food Lookup Result";
  foodSearchResult.appendChild(header);
  const searchResults = document.createElement('p');
  searchResults.textContent = "Calories For 100 grams of "+foodName+" is "+caloriesPer100g.toFixed(0);
  foodSearchResult.appendChild(searchResults);
  foodSearchResult.hidden = false;
  //Load the gram calculator
  getEl('grams-eaten').value = "";
  getEl('grams-results').innerHTML = "";
  getEl('search-gram-calculator').hidden = false;
}

//calculate the calories from the grams eaten from the search results
function searchGrams()
{
  console.log('Calculate the calories for the grams eaten');
  let grams = getEl('grams-eaten').value;
  calories = (caloriesPer100g / 100) * grams;
  console.log('Calorie Calc = '+calories);
  const gramsResults = getEl('grams-results');
  gramsResults.innerHTML = "";
  const gramsResultsHeader = document.createElement('h2');
  gramsResultsHeader.textContent = 'Results of Calories Per Grams';
  gramsResults.appendChild(gramsResultsHeader);
  const gramsResultsValue = document.createElement('p');
  gramsResultsValue.textContent = grams+' grams of '+foodName+' is '+calories.toFixed(0)+' Calories';
  gramsResults.appendChild(gramsResultsValue);
  const addButton = document.createElement('button');
  addButton.className = 'control-btn';
  addButton.textContent = 'Add To Calorie Tracker';
  addButton.addEventListener("click", addToCalorieTracker);
  gramsResults.appendChild(addButton);
  gramsResults.hidden = false;
}

//add results to the calorie tracker list
function addToCalorieTracker()
{
  console.log('Add To Calorie Tracker');
  let item = {};
  item.description = foodName || NOT_SET;
  item.calories = calories.toFixed(0) || 0;
  calorieList.caloriesSpent.push(item);
  saveData();
  updateTracker();
  displayLog();
  getEl('grams-results').hidden = true;
  getEl('search-gram-calculator').hidden = true;
  getEl('food-search-result').hidden = true;
  getEl('food-lookup-card').hidden = true;
  
}

//Save data
function saveData()
{
  console.log("Saving Data...");
  localStorage.setItem(CALORIE_LIST_KEY, JSON.stringify(calorieList));
  localStorage.setItem(CALORIE_TOTAL_KEY, JSON.stringify(totalData));
  localStorage.setItem(CALORIE_LIMIT_KEY, JSON.stringify(limitData));
  localStorage.setItem(CALORIE_TRACKING_DAY, JSON.stringify(calTrackingDay));
}

//Start a new day
function startNewDay()
{
  console.log('Start a new day');
  calorieList.caloriesSpent = [];
  saveData();
  getEl('add-calories').hidden = false;
  getEl('limit-check').hidden = true;
  getEl('daily-log').hidden = true;
}

//Exit to the main menu
function exitTracker()
{
  window.location.assign('https://tools.travelbetter.co.uk/');
}
