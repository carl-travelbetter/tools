console.log('Walk Tracker');

//Import Dom utils
import {getWrittenDate, getDuration, addDays, getDayOfYear} from "/lib/date-helper.js";
import { getEl, getText, getDate} from "/lib/dom.js";

//Load Walk List
const WALK_LIST_KEY = "walk-list";
let walkList = JSON.parse(localStorage.getItem(WALK_LIST_KEY)) || {walks: []};

//Load Target
const WALK_TARGET_KEY = "walk-target";
let targetData = JSON.parse(localStorage.getItem(WALK_TARGET_KEY)) || {target: []};
let walkTarget = targetData.target[0] || 45;

//Load Walk day
const WALK_TRACKING_DAY = "walk-tracking-day";
let walkTrackingDay = JSON.parse(localStorage.getItem(WALK_TRACKING_DAY)) || {trackingDay: []};

const dayOfYear = getDayOfYear();

//Set events for button clicks in document (will be applied to all dom objects (pages) that call this js
function bindEvents() {
  getEl('add-btn')?.addEventListener("click", addWalk);
  getEl('set-target-btn')?.addEventListener("click", openTargetControl);
  getEl('reset-btn')?.addEventListener("click", resetData);
  getEl('submit-btn')?.addEventListener("click", submitWalk);
  getEl('cancel-btn')?.addEventListener("click", cancelAddWalk);
  getEl('set-target-btn')?.addEventListener("click", setDailyTarget);
  getEl('exit-btn')?.addEventListener("click", exitTracker);
  getEl('new-day-btn')?.addEventListener("click", startNewDay);
  getEl('display-tracker-btn')?.addEventListener("click", updateTracker);
  getEl('show-log-btn')?.addEventListener("click", displayLog);
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);

//set daily target
function setDailyTarget()
{
  console.log('Set Daily Target');
}

//Open up Add Walk
function addWalk()
{
  console.log('Add Walk');
  getEl('walk-time').value = "";
  getEl('walk-distance').value = "";
  getEl('add-walk').hidden = false;
}

//Open Target control
function openTargetControl()
{
  console.log('Open Target Control');
  getEl('set-target').hidden = false;
}

//Submit Walk
function submitWalk()
{
  console.log('Submit Walk');
  let walk = {};
  walk.minutes = getEl('walk-time').value || 0;
  walk.distance = getEl('walk-distance').value || 0;
  walkList.walks.push(walk);
  saveData();
  displayLog();
}

//Cancel Adding a Walk
function cancelAddWalk()
{
  console.log('Cancel Add Walk');
}

//display walk log
function displayLog()
{
  console.log('Display Log');
  closeAll();
  const walkLogDisplay = getEl('daily-log');
  walkLogDisplay.innerHTML = "";

  const list = document.createElement('ul');

  //Create a header row for the list
  const listHeader = document.createElement('li');
  const listHeaderID = document.createElement('span');
  listHeaderID.className = 'span-id';
  listHeaderID.textContent = 'walk';
  listHeader.appendChild(listHeaderID);
  const listHeaderItem = document.createElement('span');
  listHeaderItem.className = 'span-text';
  listHeaderItem.textContent = 'Time(minutes)';
  listHeader.appendChild(listHeaderItem);
  const listHeaderValue = document.createElement('span');
  listHeaderValue.className = 'span-value';
  listHeaderValue.textContent = 'Distance(km)';
  listHeader.appendChild(listHeaderValue);
  const listHeaderAction = document.createElement('span');
  listHeaderAction.className = 'span-action';
  listHeaderAction.textContent = 'Delete Walk';
  listHeader.appendChild(listHeaderAction);

  list.appendChild(listHeader);

  //Work through list of walks and add to list output
  let idx = 0;
  walkList.walks.forEach (walk => {
    idx++;
    let listItem = document.createElement('li');
    //listItem.textContent = item.description+': '+item.calories;
    let listID = document.createElement('span');
    listID.className = 'span-id';
    listID.textContent = ""+idx;
    listItem.appendChild(listID);
    let listMinutes = document.createElement('span');
    listMinutes.className = 'span-text';
    listMinutes.textContent = walk.minuntes;
    listItem.appendChild(listMinutes);
    let listDistance = document.createElement('span');
    listDistance.className = 'span-value';
    listDistance.textContent = walk.distance;
    listItem.appendChild(listDistance);
    let listDeleteControl = document.createElement('span');
    listDeleteControl.className = 'span-action';
    
    //create a delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.setAttribute("data-label", idx-1);
      //Make the button do something
       //Make the button do something when clicked
      deleteButton.addEventListener("click", () => {
      
      console.log("Delete Expense Button Clicked");
      console.log("Delete ID = "+deleteButton.dataset.label);   
      walkList.walks.splice(deleteButton.dataset.label, 1); 
      saveData();  
      //updateTracker();
      displayLog();
      });
      listDeleteControl.appendChild(deleteButton);
      listItem.appendChild(listDeleteControl);
      list.appendChild(listItem);
  });
  
  walkLogDisplay.appendChild(list);
  walkLogDisplay.hidden = false;
  
}

//Save data
function saveData()
{
  console.log("Saving Data...");
  localStorage.setItem(WALK_LIST_KEY, JSON.stringify(walkList));
  localStorage.setItem(WALK_TRACKING_DAY, JSON.stringify(walkTrackingDay));
  localStorage.setItem(WALK_TARGET_KEY, JSON.stringify(targetData));
}

//close all option cards
function closeAll()
{
  console.log('close all non-control cards');
  getEl('add-walk').hidden = true;
  getEl('set-target').hidden = true;
  getEl('progress-check').hidden = true;
  getEl('daily-log').hidden = true;
}

//Start a new day
function startNewDay()
{
  console.log('Start a new day');
  calorieList.caloriesSpent = [];
  saveData();
  getEl('add-walk').hidden = true;
  getEl('set-target').hidden = true;
  getEl('progress-check').hidden = true;
  getEl('daily-log').hidden = true;
}

//Exit to the main menu
function exitTracker()
{
  window.location.assign('https://tools.travelbetter.co.uk/');
}
