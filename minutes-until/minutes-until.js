info("Minutes Until Initialised");

const range = document.getElementById("minutes");
const valueEl = document.getElementById("minutesValue");
const unitEl = document.getElementById("minutesUnit");

const countdownOutput = document.getElementById("countdown");
const completeEl = document.getElementById("countdown-complete");

let timerId = null;          // ✅ prevents multiple intervals
let totalSeconds = 0;

// Build output UI once (✅ no DOM rebuild every second)
const countdownCard = document.createElement("div");
countdownCard.className = "output-card";

const countdownHeader = document.createElement("h2");
countdownHeader.textContent = "Countdown Running...";
countdownCard.appendChild(countdownHeader);

const countdownText = document.createElement("p");
countdownText.className = "countdown-font";
countdownCard.appendChild(countdownText);

countdownOutput.appendChild(countdownCard);

function updateMinutesLabel() {
  const mins = Number(range.value);
  valueEl.textContent = mins;
  unitEl.textContent = mins === 1 ? "minute" : "minutes";
}

range.addEventListener("input", updateMinutesLabel);
updateMinutesLabel();

function renderCountdown() {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;

  const minsLabel = mins === 1 ? "min" : "mins";
  const secsLabel = secs === 1 ? "second" : "seconds";

  countdownText.textContent = `${mins} ${minsLabel} ${secs} ${secsLabel} to go`;
}

function stopTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}

function createMinutesUntil() {
  info("Create Minutes Until");

  // ✅ reset UI
  completeEl.hidden = true;
  countdownOutput.hidden = false;

  // ✅ stop any previous timer
  stopTimer();

  // ✅ set total seconds from slider minutes
  const mins = Number(range.value);
  totalSeconds = mins * 60;

  renderCountdown();

  timerId = setInterval(() => {
    totalSeconds -= 1;

    if (totalSeconds <= 0) {
      info("Countdown Complete");
      stopTimer();
      countdownOutput.hidden = true;
      displayComplete();
      return;
    }

    renderCountdown();
  }, 1000);
}

// Quick timers (✅ update label too)
function oneMinute() { range.value = 1; updateMinutesLabel(); createMinutesUntil(); }
function fiveMinutes() { range.value = 5; updateMinutesLabel(); createMinutesUntil(); }
function tenMinutes() { range.value = 10; updateMinutesLabel(); createMinutesUntil(); }
function fifteenMinutes() { range.value = 15; updateMinutesLabel(); createMinutesUntil(); }
function twentyfiveMinutes() { range.value = 25; updateMinutesLabel(); createMinutesUntil(); }
function fiftynineMinutes() { range.value = 59; updateMinutesLabel(); createMinutesUntil(); }

function displayComplete() {
  info("Display Countdown Complete");
  completeEl.hidden = false;
}

function info(message) {
  console.log("Minutes Until - INFO:" + message);
}
