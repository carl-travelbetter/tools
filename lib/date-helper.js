//Return a useable trip date
export const getWrittenDate = date => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let suffix = getOrdinalSuffix(date.getDate());
  let tripDate = day+" "+date.getDate()+suffix+" "+month+" "+year;
  return tripDate;
};

//Return the correct data suffix
function getOrdinalSuffix(n) {
  const lastDigit = n % 10;
  const lastTwo = n % 100;

  if (lastTwo >= 11 && lastTwo <= 13) return "th";
  if (lastDigit === 1) return "st";
  if (lastDigit === 2) return "nd";
  if (lastDigit === 3) return "rd";
  return "th";
}

//Simple date calculation between two dates to work out duration
export const getDuration = (startDate, endDate) => {
  console.log("Calculating days between dates");
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  // Normalise to midnight to avoid DST/time issues
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const diff = end - start;
  return Math.max(0, Math.round(diff / MS_PER_DAY));
};

export function addDays(dateString, days) {
  if (!dateString || isNaN(days)) return "";

  // Parse safely (avoid Date parsing quirks)
  const [year, month, day] = dateString.split("-").map(Number);

  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);

  const newYear = date.getFullYear();
  const newMonth = String(date.getMonth() + 1).padStart(2, "0");
  const newDay = String(date.getDate()).padStart(2, "0");

  return `${newYear}-${newMonth}-${newDay}`;
}
