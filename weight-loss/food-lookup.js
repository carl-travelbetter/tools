//Used to access the Open Food API and return a result

console.log('Food Lookup');

//Variables
let foodName;
let calories = 0;

//Import Dom utils
import {getWrittenDate, getDuration, addDays} from "/lib/date-helper.js";
import { getEl, getText, getDate} from "/lib/dom.js";

//Set events for button clicks in document (will be applied to all dom objects (pages) that call this js
function bindEvents() {
  getEl('food-search-btn')?.addEventListener("click", searchForFood);
  getEl('exit-btn')?.addEventListener("click", exitLookup);
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
  console.log(results);
});
  
}

function displayResult()
{
  console.log('Display Result');
}

//Exit Food Lookup
function exitLookup()
{
  console.log('Exit Food Lookup');
  window.location.assign('https://tools.travelbetter.co.uk/');
}
