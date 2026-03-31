//Used to access the Open Food API and return a result

console.log('Food Lookup');

//Variables
let foodName;
let caloriesPer100g = 0;

//Import Dom utils
import {getWrittenDate, getDuration, addDays} from "/lib/date-helper.js";
import { getEl, getText, getDate} from "/lib/dom.js";

//Set events for button clicks in document (will be applied to all dom objects (pages) that call this js
function bindEvents() {
  getEl('food-search-btn')?.addEventListener("click", searchForFood);
  getEl('exit-btn')?.addEventListener("click", exitLookup);
  getEl('calories-per-grams')?.addEventListener("click", calcCaloriesPerGrams);
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
  const output = getEl('search-result');
  output.innerHTML = "";
  const p = document.createElement('p');
  p.textContent = "Calories per 100grams: "+caloriesPer100g;
  output.appendChild(p);
  output.hidden = false;
  const gramCalculator = getEl('gram-calculator');
  gramCalculator.hidden = false;
}

//Calculate Calories Per Gram
function calcCaloriesPerGrams()
{
  console.log('Calculate Calories Per Grams');
  let grams = getEl('grams-eaten').value;
  let calories = (caloriesPer100g / 100) * grams;
  console.log('Calorie Calc = '+calories);
  const gramsResults = getEl('grams-results');
  const gramsResultsHeader = document.createElement('h2');
  gramsResultHeader.textContent = 'Results of Calories Per Grams';
  gramResults.appendChild(gramsResultHeader);
  const gramsResultsValue = document.createElement('p');
  gramsResultsValue.textContent = grams+' grams of '+foodName+' is '+calories+' Calories';
  gramsResults.appendChild(gramsResultsValue);
  gramsResults.hidden = false;
}

//Exit Food Lookup
function exitLookup()
{
  console.log('Exit Food Lookup');
  window.location.assign('https://tools.travelbetter.co.uk/');
}
