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
let currency = "GBP";

fetch('country-tip-list.json')
  .then(response => response.json())
  .then(data => {
    countryTipData = data;
    console.log("Country Tip Data Loaded:", countryTipData);
    getEl('data-loading').hidden = true;
    getEl('tip-calculator').hidden = false;
  })
  .catch(error => {
    console.error("Error loading Country Tip Data: ", error);
    const dataLoading = getEl('data-loading');
    dataLoading.innerHTML = `<p>Apologies - the tipping guidance failed to load, please refresh the page to try again</p>`;
  });

//Set events for button clicks in document (will be applied to all dom objects (pages) that call this js
function bindEvents() {
  getEl('split-btn')?.addEventListener("click", setSplitValue);
  getEl('country')?.addEventListener("change", selectCountry);
  getEl('submit-amount')?.addEventListener("click", enterAmount);
  getEl('go-again-btn')?.addEventListener("click", goAgain);
  getEl('skip-and-calc-btn')?.addEventListener("click", skipAndCalc);
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);

function formatMoney(value, currency) {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: currency
    }).format(value);
}

function enterAmount()
{
  console.log('Enter Amount');
  const input = getEl('amount');
  amount = Number(input.value);

  if (input.value.trim() === "" ||
        !Number.isFinite(amount) ||
        amount <= 0) {
        alert("Please enter a valid bill amount.");
        return;
  }

  const currencyCheck = formatMoney(amount, currency);
  console.log('Currency Format Check '+currencyCheck);
  getEl('enter-amount').hidden = true;
  getEl('split-between').hidden = false;
}

function skipAndCalc()
{
  console.log('Skip and Calc');
  split = 1;
  calculateAndDisplayResult();
}

function setSplitValue()
{
  console.log('Calculate Tip');
  split = Number(getEl('split').value) || 1;
  if (!Number.isInteger(split) || split < 1) {
      alert("Please enter a valid number of people to split the bill with.");
      return;
  }
  calculateAndDisplayResult();
}



function calculateAndDisplayResult()
{
  console.log('Display Log');
  const results = getEl('results');
  let tipAmount = Math.round((amount*(recommendedTip/100))*100)/100;
  let maxTipAmount = Math.round((amount*(maximumTip/100))*100)/100;
  let minTipAmount = Math.round((amount*(minimalTip/100))*100)/100;
  let totalBill = amount + tipAmount;
  let maxTotalBill = amount + maxTipAmount;
  let minTotalBill = amount + minTipAmount;
  getEl('split-between').hidden = true;
  getEl('tip-calculator').hidden = true;
  if (split > 1)
  {
    let tipPerPerson = Math.round((tipAmount / split)*100)/100;
    let billPerPerson = Math.round((amount / split)*100)/100;
    let totalPerPerson = tipPerPerson + billPerPerson;
    let maxTipPerPerson = Math.round((maxTipAmount / split)*100)/100;
    let minTipPerPerson = Math.round((minTipAmount / split)*100)/100;
    let maxTotalPerPerson = billPerPerson + maxTipPerPerson;
    let minTotalPerPerson = billPerPerson + minTipPerPerson;
    results.innerHTML = `<h2>Tip Recommendation For ${countryName}</h2>`+
                        `<h3>Recommended Tip</h3>`+
                        `<p><strong>Recommended Tip is ${recommendedTip}% which is ${symbol}${tipAmount}</strong></p>`+
                        `<p>This is ${symbol}${tipPerPerson} per person`+
                        `<p>When the bill (${symbol}${amount}) is also split and added to the tip this is a total payment of ${formatMoney(totalPerPerson, currency)} per person</p>`+
                        `<h3>Maximum Tip</h3>`+
                        `<p>Maximum Tip is ${maximumTip}% which is ${symbol}${maxTipAmount}</strong></p>`+
                        `<p>This is ${symbol}${maxTipPerPerson} per person`+
                        `<p>When the bill (${symbol}${amount}) is also split and added to the tip this is a total payment of ${symbol}${maxTotalPerPerson.toFixed(2)} per person</p>`+
                        `<h3>Minimum Tip</h3>`+
                        `<p>Minimum Tip is ${minimalTip}% which is ${symbol}${minTipAmount}</strong></p>`+
                        `<p>This is ${symbol}${minTipPerPerson} per person`+
                        `<p>When the bill (${symbol}${amount}) is also split and added to the tip this is a total payment of ${symbol}${minTotalPerPerson.toFixed(2)} per person</p>`+
                        `<h3>Additional Guidance</h3>`+
                        `<p>${guidance}</p>`;
  }
  else
  { 
  results.innerHTML = `<h2>Tip Recommendation For ${countryName}</h2>`+
                      `<h3>Recommended Tip</h3>`+
                      `<p><strong>Recommended Tip is ${recommendedTip}% which is ${symbol}${tipAmount.toFixed(2)}</strong> </p>`+
                      `<p>This makes your total bill ${symbol}${totalBill.toFixed(2)} (${symbol}${amount} + ${symbol}${tipAmount.toFixed(2)})</p>`+
                      `<h3>Maximum Tip</h3>`+
                      `<p>Maximum Tip would be ${maximumTip}% which is ${symbol}${maxTipAmount}</p>`+
                      `<p>This makes your total bill ${symbol}${maxTotalBill.toFixed(2)} (${symbol}${amount} + ${symbol}${maxTipAmount.toFixed(2)})</p>`+
                      `<h3>Minimum Tip</h3>`+
                      `<p>Minimum Tip would be ${minimalTip}% which is ${symbol}${minTipAmount.toFixed(2)}</p>`+
                      `<p>This makes your total bill ${symbol}${minTotalBill.toFixed(2)} (${symbol}${amount} + ${symbol}${minTipAmount.toFixed(2)})</p>`+
                      `<h3>Additional Guidance</h3>`+
                      `<p>${guidance}</p>`;
  }
  results.hidden = false;
  getEl('go-again').hidden = false;
}

function selectCountry()
{
  console.log('Select Country');
  countrySelected = getEl('country').value;
  console.log('Country Selected '+countrySelected);
  const country = countryTipData.find(
    item => item.code === countrySelected
  );
  
  if (!country) {
      return;
  }
  
  recommendedTip = Number(country.recommendedTip);
  maximumTip = Number(country.maximumTip);
  minimalTip = Number(country.minimumTip);
  guidance = country.guidance;
  symbol = country.symbol;
  currency = country.currency;
  countryName = country.country;
  const currencyFlag = getEl('currency');
  currencyFlag.innerHTML = `(${currency})`;
  getEl('select-country').hidden = true;
  getEl('enter-amount').hidden = false;
}

function goAgain()
{
  getEl('amount').value = "";
  getEl('split').value = "";
  getEl('country').value = "NN";
  getEl('results').hidden = true;
  getEl('go-again').hidden = true;
  getEl('select-country').hidden = false;
  getEl('tip-calculator').hidden = false;
}
