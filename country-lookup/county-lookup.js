console.log('Country Lookup');

//The plan for this code is to be able to return key, useful, information on any country
//This should ultimately include the latest foreign office advice

//Import Dom utils
import {getWrittenDate, getDuration, addDays} from "/lib/date-helper.js";
import { getEl, getText, getDate} from "/lib/dom.js";
import {getFlag} from "/lib/country-helper.js";

//Set events for button clicks in document (will be applied to all dom objects (pages) that call this js
function bindEvents() {
  getEl('country')?.addEventListener("change", loadCountryData); 
  //getEl('load-table')?.addEventListener("click", showTable);
  //getEl('load-spain-route-table')?.addEventListener("click", showSpainRouteTable);
  //getEl('all-france-england')?.addEventListener("click", allFranceEngland);
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);

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
