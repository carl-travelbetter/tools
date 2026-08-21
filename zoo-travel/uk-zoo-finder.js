console.log('UK Zoo Finder');

//The plan for this code is to be able to return key, useful, information on any country
//This should ultimately include the latest foreign office advice

//Import Dom utils
import {getWrittenDate, getDuration, addDays} from "/lib/date-helper.js";
import { getEl, getText, getDate} from "/lib/dom.js";
import {getFlag} from "/lib/country-helper.js";

//Load Data
let zooData = [];

fetch('uk_zoos.json')
  .then(response => response.json())
  .then(data => {
    countryData = data;
    console.log("Zoo Data Loaded:", zooData);
    getEl('data-loading').hidden = true;
    createCountrySelector();
    getEl('zoo-lookup-county').hidden = false;
  })
  .catch(error => console.error("Error loading Zoo Data:", error));

//Set events for button clicks in document (will be applied to all dom objects (pages) that call this js
function bindEvents() {
  //getEl('country')?.addEventListener("change", loadCountryData); 
  //getEl('load-table')?.addEventListener("click", showTable);
  //getEl('load-spain-route-table')?.addEventListener("click", showSpainRouteTable);
  //getEl('all-france-england')?.addEventListener("click", allFranceEngland);
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);
