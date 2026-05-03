console.log('Push and Pull Goal Manager');

//Import Dom utils
import {getWrittenDate, getDuration, addDays, getDayOfYear} from "/lib/date-helper.js";
import { getEl, getText, getDate} from "/lib/dom.js";

//Load saved data
//Load Push and Pull Lists
const PUSH_LIST_KEY = "push-list-wl";
let pushList = JSON.parse(localStorage.getItem(PUSH_LIST_KEY)) || {pushItems: []};

const PULL_LIST_KEY = "pull-list-wl";
let pullList = JSON.parse(localStorage.getItem(PULL_LIST_KEY)) || {pullItems: []};

//Setup default no value entered variable
const NOT_SET = "BLANK";

//Set events for button clicks in document (will be applied to all dom objects (pages) that call this js
function bindEvents() {
  getEl('add-push-btn')?.addEventListener("click", addPush);
  getEl('add-pull-btn')?.addEventListener("click", addPull);
  getEl('submit-push-btn')?.addEventListener("click", createPushGoal);
  getEl('submit-pull-btn')?.addEventListener("click", createPullGoal);
  getEl('cancel-push-btn')?.addEventListener("click", cancelPushGoal);
  getEl('cancel-pull-btn')?.addEventListener("click", cancelPullGoal);
  getEl('exit-btn')?.addEventListener("click", exitTool);
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);


//open add item controls
function addPush()
{
  console.log('Add Push Goal');
  getEl('push-goal').value = "";
  getEl('add-push').hidden = false;
}

//open add item controls
function addPull()
{
  console.log('Add Push Goal');
  getEl('pull-goal').value = "";
  getEl('add-pull').hidden = false;
}

//Create a push goal and update the displayed list
function createPushGoal()
{
  console.log('Create Push Goal');
}

//Create a push goal and update the displayed list
function createPullGoal()
{
  console.log('Create Pull Goal');
}

//Cancel creating a push goal
function cancelPushGoal()
{
  getEl('add-push').hidden = true;
}

//Cancel creating a pull goal
function cancelPullGoal()
{
  getEl('add-pull').hidden = true;
}

//Exit Tool
function exitTool()
{
  window.location.assign('https://tools.travelbetter.co.uk/');
}

