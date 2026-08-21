console.log('UK Zoo Finder');

//The plan for this code is to be able to return key, useful, information on any country
//This should ultimately include the latest foreign office advice

//Import Dom utils
import {getWrittenDate, getDuration, addDays} from "/lib/date-helper.js";
import { getEl, getText, getDate} from "/lib/dom.js";
import {getFlag} from "/lib/country-helper.js";

//Load Data
let zooData = [];
let countyData = [];

fetch('uk_zoos.json')
  .then(response => response.json())
  .then(data => {
    zooData = data;
    console.log("Zoo Data Loaded:", zooData);
    loadCountyData();
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

function loadCountyData()
{
  console.log('UK Zoo Finder: Load County Data');
  fetch('https://tools.travelbetter.co.uk/uk-travel/uk_counties.json')
  .then(response => response.json())
  .then(data => {
    countyData = data;
    console.log("County Data Loaded:", countyData);
    loadZooSearchOptions();
    getEl('data-loading').hidden = true;
    getEl('zoo-lookup-county').hidden = false;
  })
  .catch(error => console.error("Error loading County Data:", error));
}

function loadZooSearchOptions()
{
  console.log('UK Zoo Finder: Load Zoo Search Options');
  const searchOptionsArea = document.createElement('div');
  searchOptionsArea.innderHTML = "";
  const searchOptionsInstructions = document.createElement('p');
  searchOptionsInstructions.textContent = "Select A Search Option To Find a UK Zoo";
  searchOptionsArea.appendChild(searchOptionsInstructions);
  const countySelector = document.createElement('select');
  countySelector.className = 'option-selection';
  countySelector.addEventListner("change", (event) => {
    loadZoosByCounty(event.target.value);
  });
  let countyPlaceHolder = document.createElement('option');
  countyPlaceHolder.value = 'Placeholder';
  countyPlaceHolder.textContent = 'Search By County';
  countySelector.appendChild(countyPlaceholder);
  countyData.forEach(county =>
    {
      let countyOption = document.createElement('option');
      countyOption.value = county.CountyName;
      countyOption.textContent = county.CountyName;
      countySelector.appendChild(countyOption);
    });
  searchOptionsArea.appendChild(countySelector);
  
  getEl('zoo-look-county').appendChild(searchOptionsArea);  
}


function loadZoosByCounty(county)
{
  console.log('UK Zoo Finder: Load Zoos By County');
  
}
