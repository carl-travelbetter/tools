console.log('Gobal Tip Calculator');

//Import Dom utils
import { getEl, getText, getDate} from "/lib/dom.js";

//Load Data
let countryTipData = [];

let countrySelected = "UK";
let split = 1;
let amount = 0;
let recommendedTip = 10;
let guidance = "Check if a service charge has already been added";
let countryName = "United Kingdom";
let currency = "GBP";
let mode = "percentage";
let roundUp = 0;

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
  getEl('amount')?.addEventListener("input", hideResult);
  getEl('split')?.addEventListener("input", hideResult);
  getEl('percentage')?.addEventListener("input", hideResult);
  getEl('mode-switch')?.addEventListener("click", switchModes);
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

  // Create the label
  const countryLabel = document.createElement('label');
  countryLabel.textContent = "Where are you eating?";
  countryLabel.setAttribute('for', 'country');
  
  // Create the select
  const countrySelect = document.createElement('select');
  countrySelect.id = 'country';
  countrySelect.name = 'country';
  countrySelect.className = 'form-input';
  countrySelect.required = true;

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
  countrySelectArea.replaceChildren(countryLabel, countrySelect);
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
    hideResult();
  });

  tenPercent.addEventListener("click", () => {
    tenPercent.classList.add("active");
    fivePercent.classList.remove("active");
    fifteenPercent.classList.remove("active");
    twentyPercent.classList.remove("active");
    twentyFivePercent.classList.remove("active");
    recommendedTip = 10;
    getEl('percentage').value = recommendedTip;
    hideResult();
  });

  fifteenPercent.addEventListener("click", () => {
    fifteenPercent.classList.add("active");
    fivePercent.classList.remove("active");
    tenPercent.classList.remove("active");
    twentyPercent.classList.remove("active");
    twentyFivePercent.classList.remove("active");
    recommendedTip = 15;
    getEl('percentage').value = recommendedTip;
    hideResult();
  });

  twentyPercent.addEventListener("click", () => {
    twentyPercent.classList.add("active");
    fivePercent.classList.remove("active");
    tenPercent.classList.remove("active");
    fifteenPercent.classList.remove("active");
    twentyFivePercent.classList.remove("active");
    recommendedTip = 20;
    getEl('percentage').value = recommendedTip;
    hideResult();
  });

  twentyFivePercent.addEventListener("click", () => {
    twentyFivePercent.classList.add("active");
    fivePercent.classList.remove("active");
    tenPercent.classList.remove("active");
    fifteenPercent.classList.remove("active");
    twentyPercent.classList.remove("active");
    recommendedTip = 25;
    getEl('percentage').value = recommendedTip;
    hideResult();
  });
  
}

//switch between rounded and percentage tip solution
function switchModes()
{
  console.log('Switch modes');
  const modeSwitch = getEl('mode-switch');
  goAgain();
  // If the checkbox is checked, display the output text
  if (modeSwitch.checked == true){
    console.log('Round Mode Activated');
    mode = "rounded";
    getEl('percentage-mode').hidden = true;
    getEl('percent-buttons').hidden = true;
    getEl('round-mode').hidden = false;
  } else {
    console.log('Percentage Tip Mode Activated');
    mode = "percentage";
    getEl('round-mode').hidden = true;
    getEl('percentage-mode').hidden = false;
    getEl('percent-buttons').hidden = false;
  }
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

  if (mode === "percentage")
  {
    const percentageEntered = getEl('percentage').value;
    recommendedTip = Number(percentageEntered);
    if (!Number.isFinite(recommendedTip) ||
      recommendedTip < 0 ||
      recommendedTip > 100) {
      errorMessage.textContent = "ℹ️ Please enter a tip between 0% and 100%";
      errorMessage.hidden = false;
      return;
    }
  }
  else
  {
      //assumes roundup mode
      const roundUpAmount = getEl('round-up').value;
      roundUp = Number(roundUpAmount);
      if (!Number.isFinite(roundUp) ||
        roundUp < 0 ||
        roundUp < amount) {
        errorMessage.textContent = "ℹ️ Please enter a round up amount greater than the bill amount";
        errorMessage.hidden = false;
        return;
      }
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
  let tipAmount = 0;
  let totalBill = 0;
  let totalPerPerson = 0;
  
  if (mode === "percentage")
  {
     tipAmount = amount*(recommendedTip/100);
     totalBill = amount + tipAmount;
  }
  else
  {
      tipAmount = roundUp - amount;
      totalBill = roundUp;
  }
  totalPerPerson = totalBill / split;
   
    results.innerHTML = `<p>Each Person Pays</p>`+
                        `<p style="font-size:1.5em"> ${formatMoney(totalPerPerson,currency)}</p>`+
                        `<hr>`+
                        `<p>Tip           ${formatMoney(tipAmount, currency)}</p>`+
                        `<p>Total Bill    ${formatMoney(totalBill, currency)}</p>`;
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
  guidance = country.guidance;
  currency = country.currency;
  countryName = country.country;
  //getEl('select-country').hidden = true;
  const guidanceOutput = getEl('guidance');
  guidanceOutput.innerHTML = `<p><strong>ℹ️ Tipping Guidance</strong></p>`+
                              `<p>${guidance}</p>`;
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
