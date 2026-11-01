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
  getEl('country')?.addEventListener("change", selectCountry);
  getEl('go-again-btn')?.addEventListener("click", goAgain);
  getEl('split')?.addEventListener("change", setSplitValue);
  getEl('skip-and-calc-btn')?.addEventListener("click", skipAndCalc);
  getEl('carry-on-btn')?.addEventListener("click", loadCalcultor);
  setupPercentageButtons();
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);

function formatMoney(value, currency) {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: currency
    }).format(value);
}

function setupPercentageButtons()
{
  console.log('Setting Up Percentage Buttons');

   console.log('Setup Activity Buttons Monday');
  //Setup Activity Buttons for non previous BMR
  const fivePercent = getEl('five-percent-btn');
  const tenPercent = getEl('ten-percent-btn');
  const fifteenPercent = getEl('fifteen-percent-btn');
  const twentyPercent = getEl('twenty-percent-btn');
  const twentyFivePercent = getEl('twenty-five-percent-btn');
  
  fivePercent.addEventListener("click", () => {
    fivePercent.classList.toggle("active");
    tenPercent.classList.remove("active");
    fifteenPercent.classList.remove("active");
    twentyPercent.classList.remove("active");
    twentyFivePercent.classList.remove("active");
    recommendedTip = 5;
    getEl('percentage').value = recommendedTip;
  });

  tenPercent.addEventListener("click", () => {
    tenPercent.classList.toggle("active");
    fivePercent.classList.remove("active");
    fifteenPercent.classList.remove("active");
    twentyPercent.classList.remove("active");
    twentyFivePercent.classList.remove("active");
    recommendedTip = 10;
    getEl('percentage').value = recommendedTip;
  });

  fifteenPercent.addEventListener("click", () => {
    fifteenPercent.classList.toggle("active");
    fivePercent.classList.remove("active");
    tenPercent.classList.remove("active");
    twentyPercent.classList.remove("active");
    twentyFivePercent.classList.remove("active");
    recommendedTip = 15;
    getEl('percentage').value = recommendedTip;
  });

  twentyPercent.addEventListener("click", () => {
    twentyPercent.classList.toggle("active");
    fivePercent.classList.remove("active");
    tenPercent.classList.remove("active");
    fifteenPercent.classList.remove("active");
    twentyFivePercent.classList.remove("active");
    recommendedTip = 20;
    getEl('percentage').value = recommendedTip;
  });

  twentyFivePercent.addEventListener("click", () => {
    twentyFivePercent.classList.toggle("active");
    fivePercent.classList.remove("active");
    tenPercent.classList.remove("active");
    fifteenPercent.classList.remove("active");
    twentyPercent.classList.remove("active");
    recommendedTip = 25;
    getEl('percentage').value = recommendedTip;
  });
  
}

function loadCalcultor()
{
  console.log('Load Calculator');
  getEl('country-guidance').hidden = true;
  getEl('tip-calculator').hidden = false;
}

function enterBill()
{
  console.log('Enter Bill');
  const input = getEl('amount');
  amount = Number(input.value);

  if (input.value.trim() === "" ||
        !Number.isFinite(amount) ||
        amount <= 0) {
        alert("Please enter a valid bill amount.");
        return;
  }

  calculateAndDisplayResult();
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
                        `<p><strong>Recommended Tip is ${recommendedTip}% which is ${formatMoney(tipAmount, currency)}</strong></p>`+
                        `<p>This is ${formatMoney(tipPerPerson, currency)} per person`+
                        `<p>When the bill (${formatMoney(amount,currency)}) is also split and added to the tip this is a total payment of ${formatMoney(totalPerPerson, currency)} per person</p>`+
                        `<h3>Recommended Maximum Tip</h3>`+
                        `<p>Recommended Maximum Tip is ${maximumTip}% which is ${formatMoney(maxTipAmount, currency)}</strong></p>`+
                        `<p>This is ${formatMoney(maxTipPerPerson,currency)} per person`+
                        `<p>When the bill (${formatMoney(amount,currency)}) is also split and added to the tip this is a total payment of ${formatMoney(maxTotalPerPerson,currency)} per person</p>`+
                        `<h3>Recommended Minimum Tip</h3>`+
                        `<p>Recommended Minimum Tip is ${minimalTip}% which is ${formatMoney(minTipAmount,currency)}</strong></p>`+
                        `<p>This is ${formatMoney(minTipPerPerson,currency)} per person`+
                        `<p>When the bill (${formatMoney(amount,currency)}) is also split and added to the tip this is a total payment of ${formatMoney(minTotalPerPerson,currency)} per person</p>`+
                        `<h3>Additional Guidance</h3>`+
                        `<p>${guidance}</p>`;
  }
  else
  { 
  results.innerHTML = `<h2>Tip Recommendation For ${countryName}</h2>`+
                      `<h3>Recommended Tip</h3>`+
                      `<p><strong>Recommended Tip is ${recommendedTip}% which is ${formatMoney(tipAmount, currency)}</strong> </p>`+
                      `<p>This makes your total bill ${formatMoney(totalBill,currency)} (${formatMoney(amount,currency)} + ${formatMoney(tipAmount, currency)})</p>`+
                      `<h3>Recommended Maximum Tip</h3>`+
                      `<p>Recommended Maximum Tip would be ${maximumTip}% which is ${formatMoney(maxTipAmount,currency)}</p>`+
                      `<p>This makes your total bill ${formatMoney(maxTotalBill,currency)} (${formatMoney(amount,currency)} + ${formatMoney(maxTipAmount,currency)})</p>`+
                      `<h3>Recommended Minimum Tip</h3>`+
                      `<p>Recommended Minimum Tip would be ${minimalTip}% which is ${formatMoney(minTipAmount,currency)}</p>`+
                      `<p>This makes your total bill ${formatMoney(minTotalBill,currency)} (${formatMoney(amount,currency)} + ${formatMoney(minTipAmount,currency)}</p>`+
                      `<h3>Additional Guidance</h3>`+
                      `<p>${guidance}</p>`;
  }
  results.hidden = false;
  getEl('go-again').hidden = false;
}

//First action by the user, selects a country and is than presented with the guidance
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
  currency = country.currency;
  countryName = country.country;
  
  getEl('select-country').hidden = true;
  const guidanceOutput = getEl('guidance');
  guidanceOutput.innerHTML = `<h3>Tipping Guidance For ${country.country}</h3>`+
                       `<p>${guidance}</p>`;
  getEl('country-guidance').hidden = false;
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
