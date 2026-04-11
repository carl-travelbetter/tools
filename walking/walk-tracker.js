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

//Open up Add Walk
function addWalk()
{
  console.log('Add Walk');
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
}

//Cancel Adding a Walk
function cancelAddWalk()
{
  console.log('Cancel Add Walk');
}


//Save data
function saveData()
{
  console.log("Saving Data...");
  localStorage.setItem(WALK_LIST_KEY, JSON.stringify(walkList));
  localStorage.setItem(WALK_TRACKING_DAY, JSON.stringify(walkTrackingDay));
  localStorage.setItem(WALK_TARGET_KEY, JSON.stringify(targetData));
}
