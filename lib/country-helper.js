console.log('Country Helper');

//return the path to a countries svg of their flag based on the iso code being inputted
//This is likely to need apps where selection options based on iso codes are entered.
export const getFlag(countryCode)
{
  let lowerCaseCode = countryCode.toLowerCase();
  console.log('Lower Case Code = '+lowerCaseCode);
  let flagDestination = `http://tools.travelbetter.co.uk/lib/flags/svg/${lowerCaseCode}.svg`;
  return flagDestination;
}
