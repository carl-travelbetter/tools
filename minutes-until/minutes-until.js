info('Minutes Until Initialised');

info('Creating Minutes Until Countdown');

const range = document.getElementById("minutes");
const valueEl = document.getElementById("minutesValue");
const unitEl = document.getElementById("minutesUnit");

function updateMinutesLabel() {
    info('Update Minutes Label');
    const mins = Number(range.value);
    valueEl.textContent = mins;
    unitEl.textContent = mins === 1 ? "minute" : "minutes";
  }

  // Update live while dragging
  range.addEventListener("input", updateMinutesLabel);

  // Ensure correct label on page load
  updateMinutesLabel();

function createMinutesUntil()
{
    info('Create Minutes Until');
}


//Simple output to apply some useful information
function info(message)
{
  console.log("Minutes Until - INFO:"+message); 
  
}

