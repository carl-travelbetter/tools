console.log('Gobal Tip Calculator');

//Import Dom utils
import {getWrittenDate, getDuration, addDays} from "/lib/date-helper.js";
import { getEl, getText, getDate} from "/lib/dom.js";

//Load Data
let countryTipData = [];

fetch('country-tip-list.json')
  .then(response => response.json())
  .then(data => {
    countryTipData = data;
    console.log("Country Tip Data Loaded:", countryTipData);
    getEl('data-loading').hidden = true;
  })
  .catch(error => console.error("Error loading Country Tip Data: ", error));

//Set events for button clicks in document (will be applied to all dom objects (pages) that call this js
function bindEvents() {
  getEl('calculate-btn')?.addEventListener("click", calculateTip);
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);

function calculateTip()
{
  console.log('Calculate Tip');
  displayResult();
}

function displayResult()
{
  console.log('Display Log');
  const results = getEl('results');
  results.innerHTML = `<h2>Suggested Tip</h2>`+
                      `<p>Tipping Result</p>`;
  results.hidden = false;
}
