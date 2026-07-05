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
  selector.addEventListener("change", (event) => {
    loadCountryData(event.target.value);
  });
  let placeHolder = document.createElement('option');
  placeHolder.value = 'Placeholder';
  placeHolder.textContent = 'Select a country';
  selector.appendChild(placeHolder);
  countryData.forEach(country =>
    {
      let option = document.createElement('option');
      option.value = country.isoAlphaTwo;
      option.textContent = country.name;
      selector.appendChild(option);
    });
  countrySelectorDiv.innerHTML = "";
  countrySelectorDiv.appendChild(selector);
  console.log('Country Lookup: End Country Selector From JSON ');
}

function outputSelection(countryID)
{
  console.log('Country Lookup: Country ID '+countryID);
}
  
function loadCountryData(countryID)
{
  console.log('Country Lookup: Load Country Data ');
  let flagLocation = getFlag(countryID);
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

async function foreignOfficeAdvice(countryName) {
  const url = `https://www.gov.uk/api/content/foreign-travel-advice/${countryName}`;

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
      lookupError();
    }

    const data = await res.json();

    return data.products || [];

  } catch (error) {

    if (error.name === "AbortError") {
      console.error("Request timed out");
    } else {
      console.error("API error:", error);
    }
    lookupError
    return [];

  } finally {
    clearTimeout(timeoutId);
  }
}

//food lookup error
function lookupError()
{
  alert('Apologies, someting has gone wrong with the lookup. Sorry for the inconvienance');
  //getEl('searching').hidden = true;
  //openFoodLookup();
}
