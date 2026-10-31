console.log('Gobal Tip Calculator');

//Import Dom utils
import {getWrittenDate, getDuration, addDays} from "/lib/date-helper.js";
import { getEl, getText, getDate} from "/lib/dom.js";

//Load Data
let countryTipData = [];

let countrySelected = "UK";
let split = 2;
let amount = 0;
let countryData = [];

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
  getEl('country')?.addEventListener("change", selectCountry);
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);

function calculateTip()
{
  console.log('Calculate Tip');
  split = Number(getEl('split').value);
  amount = Number(getEl('amount').value);
  displayResult();
}

function displayResult()
{
  console.log('Display Log');
  const results = getEl('results');
  let tip = amount*0.2;
  results.innerHTML = `<h2>Suggested Tip</h2>`+
                      `<p>20% Tip = ${tip}</p>`;
  results.hidden = false;
}

function selectCountry()
{
  console.log('Select Country');
  countrySelected = getEl('country').value;
  console.log('Country Selected '+countrySelected);
  countryData = countryTipData.filter(country => 
       country.code.includes(countrySelected)
  );

  let country = countryData[0];
  const currencyFlag = getEl('currency');
  currencyFlag.innerHTML = `(${country.currency})`;
}
