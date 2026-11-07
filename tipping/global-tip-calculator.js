console.log('Gobal Tip Calculator');

//Import Dom utils
import {getWrittenDate, getDuration, addDays} from "/lib/date-helper.js";
import { getEl, getText, getDate} from "/lib/dom.js";

//Load Data
let countryTipData = [];

let countrySelected = "UK";
let split = 1;
let amount = 0;
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
    loadCountrySelector();
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
  getEl('calculate-tip')?.addEventListener("click", calculateTip);
  getEl('amount')?.addEventListener("change", hideResult);
  getEl('split')?.addEventListener("change", hideResult);
  getEl('percentage')?.addEventListener("change", hideResult);
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

function loadCountrySelector()
{
  console.log('Setting Up Country Data');
  const countrySelectArea = getEl('select-country');
  const countrySelect = document.createElement('select');

  //countrySelect.className = 'option-selection';
  countrySelect.addEventListener("change", (event) => {
    selectCountry(event.target.value);
  });
  const placeholder = document.createElement('option');
  placeholder.value = "NN";
  placeholder.textContent = "Select Country";
  countrySelect.appendChild(placeholder);
  countryTipData.forEach (country =>
    {
      const countryOption = document.createElement('option');
      countryOption.value = country.code;
      countryOption.textContent = country.country;
      countrySelect.appendChild(countryOption);
    });
  countrySelectArea.innerHTML = "";
  countrySelectArea.appendChild(countrySelect);
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
    fivePercent.classList.add("active");
    tenPercent.classList.remove("active");
    fifteenPercent.classList.remove("active");
    twentyPercent.classList.remove("active");
    twentyFivePercent.classList.remove("active");
    recommendedTip = 5;
    getEl('percentage').value = recommendedTip;
  });

  tenPercent.addEventListener("click", () => {
    tenPercent.classList.add("active");
    fivePercent.classList.remove("active");
    fifteenPercent.classList.remove("active");
    twentyPercent.classList.remove("active");
    twentyFivePercent.classList.remove("active");
    recommendedTip = 10;
    getEl('percentage').value = recommendedTip;
  });

  fifteenPercent.addEventListener("click", () => {
    fifteenPercent.classList.add("active");
    fivePercent.classList.remove("active");
    tenPercent.classList.remove("active");
    twentyPercent.classList.remove("active");
    twentyFivePercent.classList.remove("active");
    recommendedTip = 15;
    getEl('percentage').value = recommendedTip;
  });

  twentyPercent.addEventListener("click", () => {
    twentyPercent.classList.add("active");
    fivePercent.classList.remove("active");
    tenPercent.classList.remove("active");
    fifteenPercent.classList.remove("active");
    twentyFivePercent.classList.remove("active");
    recommendedTip = 20;
    getEl('percentage').value = recommendedTip;
  });

  twentyFivePercent.addEventListener("click", () => {
    twentyFivePercent.classList.add("active");
    fivePercent.classList.remove("active");
    tenPercent.classList.remove("active");
    fifteenPercent.classList.remove("active");
    twentyPercent.classList.remove("active");
    recommendedTip = 25;
    getEl('percentage').value = recommendedTip;
  });
  
}

//Grab the variables and calculate the tip - including error handling
function calculateTip()
{
  console.log('Calculate Tip');
  const errorMessage = getEl('error-message');
  errorMessage.hidden = true;
  const input = getEl('amount');
  amount = Number(input.value);

  if (input.value.trim() === "" ||
        !Number.isFinite(amount) ||
        amount <= 0) {
        errorMessage.textContent = "ℹ️ Please enter a valid amount for the bill";
        errorMessage.hidden = false;
        return;
  }

  const percentageEntered = getEl('percentage').value;
  recommendedTip = Number(percentageEntered);
  if (!Number.isFinite(recommendedTip) ||
    recommendedTip < 0 ||
    recommendedTip > 100) {
    errorMessage.textContent = "ℹ️ Please enter a tip between 0% and 100%";
    errorMessage.hidden = false;
    return;
}
  
 split = Number(getEl('split').value);

    if (!Number.isInteger(split) || split < 1) {
      errorMessage.textContent =
        "Please enter at least one person.";
      errorMessage.hidden = false;
      return;
    }
  calculateAndDisplayResult();
}

function setPercentage()
{
  recommendedTip = Number(getEl('percentage'));
  calculateAndDisplayResult();
}

function loadCalculator()
{
  console.log('Load Calculator');
  getEl('country-guidance').hidden = true;
  getEl('intro').hidden = true;
  getEl('calculator').hidden = false;
}


function calculateAndDisplayResult()
{
  console.log('Display Log');
  const results = getEl('results');
  let tipAmount = Math.round((amount*(recommendedTip/100))*100)/100;
  let totalBill = amount + tipAmount;

    let tipPerPerson = Math.round((tipAmount / split)*100)/100;
    let totalPerPerson = totalBill / split;
   
    results.innerHTML = `<p><strong>Tip at ${recommendedTip}% is ${formatMoney(tipAmount, currency)}</strong></p>`+
                        `<p>Total Bill (amount + tip) is  ${formatMoney(totalBill, currency)}</p>`+
                        `<p>Price Per Person (when divded equally) is ${formatMoney(totalPerPerson,currency)}</p>`;
 
  results.hidden = false;
 // getEl('go-again').hidden = false;
}

//First action by the user, selects a country and is than presented with the guidance
function selectCountry(countryCode)
{
  console.log('Select Country');
  console.log('Country Selected '+countryCode);
  const errorMessage = getEl('error-message');
  errorMessage.hidden = true;
  const country = countryTipData.find(
    item => item.code === countryCode
  );
  
  if (!country) {
      return;
  }
  
  recommendedTip = Number(country.recommendedTip);
  getEl('percentage').value = recommendedTip;
  maximumTip = Number(country.maximumTip);
  minimalTip = Number(country.minimumTip);
  guidance = country.guidance;
  currency = country.currency;
  countryName = country.country;
  //getEl('select-country').hidden = true;
  const guidanceOutput = getEl('guidance');
  guidanceOutput.innerHTML = `<p>ℹ️ ${guidance} Suggested tip ${recommendedTip}%</p>`;
  getEl('country-guidance').hidden = false;
  goAgain();

}

function hideResult()
{
  getEl('results').innerHTML = "";
  getEl('results').hidden = true;
}

function goAgain()
{
    getEl('amount').value = "";
    getEl('split').value = "1";
    getEl('results').hidden = true;
    

    document.querySelectorAll('.tag-btn').forEach(button => {
        button.classList.remove('active');
    });
}
