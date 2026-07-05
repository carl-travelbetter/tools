console.log('Country Lookup');

//The plan for this code is to be able to return key, useful, information on any country
//This should ultimately include the latest foreign office advice

//Import Dom utils
import {getWrittenDate, getDuration, addDays} from "/lib/date-helper.js";
import { getEl, getText, getDate} from "/lib/dom.js";
import {getFlag} from "/lib/country-helper.js";

//Load Data
let countryData = [];

fetch('country-data.json')
  .then(response => response.json())
  .then(data => {
    countryData = data;
    console.log("Country Data Loaded:", countryData);
    getEl('data-loading').hidden = true;
    createCountrySelector();
    getEl('country-lookup').hidden = false;
  })
  .catch(error => console.error("Error loading Country Data:", error));

//Set events for button clicks in document (will be applied to all dom objects (pages) that call this js
function bindEvents() {
  getEl('country')?.addEventListener("change", loadCountryData); 
  //getEl('load-table')?.addEventListener("click", showTable);
  //getEl('load-spain-route-table')?.addEventListener("click", showSpainRouteTable);
  //getEl('all-france-england')?.addEventListener("click", allFranceEngland);
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);

function createCountrySelector()
{
  console.log('Country Lookup: Create Country Selector ');
  const countrySelectorDiv = getEl('country-lookup');
  const selector = document.createElement('select');
  selector.className = 'option-selection';
  selector.addEventListener("change", outputSelection(selector.value)); 
  countryData.forEach(country =>
    {
      console.log('Country Lookup '+country.name);
    });
  let option1 = document.createElement('option');
  option1.textContent = "Option 1";
  option1.value = "option1";
  selector.appendChild(option1);
  let option2 = document.createElement('option');
  option2.textContent = "Option 2";
  option2.value = "option2";
  selector.appendChild(option2);
  countrySelectorDiv.innerHTML = "";
  countrySelectorDiv.appendChild(selector);
  console.log('Country Lookup: End Country Selector ');
}

function outputSelection(countryID)
{
  console.log('Country Lookup: Country ID '+countryID);
}
  
function loadCountryData()
{
  console.log('Country Lookup: Load Country Data ');
  const selectedCountryID = getEl('country').value;
  let flagLocation = getFlag(selectedCountryID);
  console.log('flag location '+flagLocation);
  const results = getEl('results');
  results.innerHTML = "";
  let flag = document.createElement('div');
  flag.innerHTML = `<h3>Flag</h3> 
                    <img src="${flagLocation}" width="200px" />
                    `;
  results.appendChild(flag);
  results.hidden = false;
}
