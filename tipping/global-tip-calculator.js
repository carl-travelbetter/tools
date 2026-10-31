console.log('Gobal Tip Calculator');

//Import Dom utils
import {getWrittenDate, getDuration, addDays} from "/lib/date-helper.js";
import { getEl, getText, getDate} from "/lib/dom.js";

//Load Data
let countryTipData = [];

let countrySelected = "UK";
let split = 1;
let amount = 0;
let countryData = [];
let recommendedTip = 10;
let minimalTip = 0;
let maximumTip = 25;
let guidance = "Check if a service charge has already been added";
let symbol = "£";
let countryName = "United Kingdom";

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
  getEl('submit-amount')?.addEventListener("click", enterAmount);
  getEl('go-again')?.addEventListener("click", goAgain);
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);

function enterAmount()
{
  console.log('Enter Amount');
  amount = Number(getEl('amount').value);
  getEl('enter-amount').hidden = true;
  getEl('split-between').hidden = false;
}

function calculateTip()
{
  console.log('Calculate Tip');
  split = Number(getEl('split').value);
  displayResult();
}

function displayResult()
{
  console.log('Display Log');
  const results = getEl('results');
  let tipAmount = Math.round(amount*(recommendedTip/100));
  getEl('split-between').hidden = true;
  getEl('tip-calculator').hidden = true;
  if (split > 1)
  {
    let tipPerPerson = tipAmount / split;
    let billPerPerson = amount / split;
    let totalPerPerson = tipPerPerson + billPerPerson;
    results.innerHTML = `<h2>Tip Recommendations For ${countryName}</h2>`+
                        `<p>Recommended Tip is ${recommendedTip}% which is ${symbol}${tipAmount}</p>`+
                        `<p>This is ${symbol}${tipPerPerson} per person`+
                        `<p>When the bill (${symbol}${amount}) is also split and added to the tip this is a total payment of ${symbol}${totalPerPerson} per person</p>`+
                        `<p>Guidance: ${guidance}</p>`;
  }
  else
  {
  results.innerHTML = `<h2>Suggested Tip</h2>`+
                      `<p>Recommended Tip is ${recommendedTip}% which is ${symbol}${tipAmount}</p>`+
                      `<p>Guidance: ${guidance}</p>`;
  }
  results.hidden = false;
  getEl('go-again').hidden = false;
}

function selectCountry()
{
  console.log('Select Country');
  countrySelected = getEl('country').value;
  console.log('Country Selected '+countrySelected);
  countryData = countryTipData.filter(country => 
       country.code.includes(countrySelected)
  );
  console.log("countryData.length");
  let country = countryData[0];
  recommendedTip = Number(country.recommendedTip);
  maximumTip = Number(country.maximumTip);
  minimalTip = Number(country.minimumTip);
  guidance = country.guidance;
  symbol = country.symbol;
  countryName = country.country;
  const currencyFlag = getEl('currency');
  currencyFlag.innerHTML = `(${country.currency})`;
  getEl('select-country').hidden = true;
  getEl('enter-amount').hidden = false;
}

function goAgain()
{
  getEl('amount').value = "";
  getEl('split').value = "";
  getEl('country').value = "Select Country";
  getEl('results').hidden = true;
  getEl('go-again').hidden = true;
  getEl('select-country').hidden = false;
  getEl('tip-calculator').hidden = false;
}
