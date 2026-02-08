//function to return an element from the Dom when passed a name
export const getEl = id => 
{
  return document.getElementById(id);
}

/**
 * Get a trimmed string value from an input.
 * Returns fallback (default: NOT_SET) if missing/empty/whitespace.
 */


export const getText = (id, fallback) => 
{
  const v = getEl(id)?.value;
  const cleaned = (v ?? "").trim();
  return cleaned ? cleaned : fallback;
}

/**
 * Get a Date from <input type="date"> using valueAsDate.
 * Returns fallback (default: NOT_SET) if missing/empty/invalid.
 */
export const getDate = (id, fallback) => {
  const d = getEl(id)?.valueAsDate;
  return d ?? fallback; // valueAsDate is null when empty
}
