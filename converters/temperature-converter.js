console.log('temperature-converter');

//Import Dom utils
import {getWrittenDate, getDuration, addDays} from "/lib/date-helper.js";
import {getEl, getText, getDate} from "/lib/dom.js";

//Set events for button clicks in document (will be applied to all dom objects (pages) that call this js
function bindEvents() {
  getEl('celcius')?.addEventListener("keyup", convertCelcius);
  getEl('fahrenheit')?.addEventListener("keyup", convertFahrenheit);
  getEl('kelvin')?.addEventListener("keyup", convertKelvin);
  getEl('clear-btn')?.addEventListener("click", clearValues);
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);

function convertCelcius()
{
  //Formula F = ((C/5)*9)+32
  console.log('Converting Celcius');
  let c = getEl('celcius').value;
  let f = ((c/5)*9)+32;
  getEl('fahrenheit').value = f;
  let k = (c*1) + 273.15;
  getEl('kelvin').value = k;
}

function convertFahrenheit()
{
  console.log('Converting Fahrenheit');
   let f = getEl('fahrenheit').value;
   let c = ((f-32)*5)/9;
   getEl('celcius').value = c;
}

function convertKelvin()
{
  console.log('Converting Kelvin');
  let k = getEl('kelvin').value;
  let c = (k*1) - 273.15;
  getEl('celcius').value = c;
}

function clearValues()
{
  console.log('Clear Values');
  getEl('celcius').value = "";
  getEl('fahrenheit').value = "";
  getEl('kelvin').value = "";
}
          
