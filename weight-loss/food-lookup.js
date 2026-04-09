//Used to access the Open Food API and return a result

console.log('Food Lookup');

//Variables
let foodName;
let caloriesPer100g = 0;
let calories = 0;
//Import Dom utils
import {getWrittenDate, getDuration, addDays} from "/lib/date-helper.js";
import { getEl, getText, getDate} from "/lib/dom.js";

//Load Calorie Tracker List
const CALORIE_LIST_KEY = "calories-list";
let calorieList = JSON.parse(localStorage.getItem(CALORIE_LIST_KEY)) || {caloriesSpent: []};

//Set events for button clicks in document (will be applied to all dom objects (pages) that call this js
function bindEvents() {
  getEl('food-search-btn')?.addEventListener("click", searchForFood);
  getEl('food-name')?.addEventListener("submit", searchForFood);
  getEl('exit-btn')?.addEventListener("click", exitLookup);
  getEl('calories-per-grams')?.addEventListener("click", calcCaloriesPerGrams);
  getEl('calorie-tracker')?.addEventListener("click", goToCalorieTracker);
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);

async function searchProducts(query) {
  const url = `https://world.openfoodfacts.net/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=10&fields=product_name,brands,nutriments`;

  const res = await fetch(url);
  const data = await res.json();

  return data.products || [];
}



//Serch for Food
function searchForFood()
{
  console.log('Search For Food');
  foodName = getEl('food-name').value;

  //Display Progress Bar
  getEl('main-menu').hidden = true;
  getEl('searching').hidden = false;
  getEl('gram-calculator').hidden = true;
  getEl('search-result').hidden = true;
  // Example usage
  searchProducts(foodName).then(results => {
  caloriesPer100g = results[1].nutriments["energy-kcal_100g"];  
  console.log(caloriesPer100g);
  displayResult();
});
  
}

function displayResult()
{
  console.log('Display Result');
  getEl('searching').hidden = true;
  getEl('main-menu').hidden = false;
  const output = getEl('search-result');
  output.innerHTML = "";
  const p = document.createElement('p');
  p.textContent = "Calories per 100 grams of "+foodName+": "+caloriesPer100g.toFixed(0);
  output.appendChild(p);
  output.hidden = false;
  const gramCalculator = getEl('gram-calculator');
  getEl('grams-eaten').value = "";
  getEl('grams-results').innerHTML = "";
  gramCalculator.hidden = false;
}

//add to calorie tracker
function addToCalorieTracker()
{
  console.log('Add To Calorie Tracker');
  let item = {};
  item.description = foodName || NOT_SET;
  item.calories = calories || 0;
  calorieList.caloriesSpent.push(item);
  saveData();
  goToCalorieTracker();
}

//Save data
function saveData()
{
  console.log("Saving Data...");
  localStorage.setItem(CALORIE_LIST_KEY, JSON.stringify(calorieList));
}

//Calculate Calories Per Gram
function calcCaloriesPerGrams()
{
  console.log('Calculate Calories Per Grams');
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

//Exit Food Lookup
function exitLookup()
{
  console.log('Exit Food Lookup');
  window.location.assign('https://tools.travelbetter.co.uk/');
}

//Go to the calorie tracker
function goToCalorieTracker()
{
  console.log('Go To Calorie Tracker');
  window.location.assign('https://tools.travelbetter.co.uk/weight-loss/');
}
