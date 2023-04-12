// Removes any value that is not duplicated


const XLSX = require('xlsx');
const fs = require('fs');
const workbook = XLSX.readFile('matches.xlsx');
const sheet_name = workbook.SheetNames[0]; //assuming you want to read the first sheet
const worksheet = workbook.Sheets[sheet_name];

const data = XLSX.utils.sheet_to_json(worksheet, {header:1});

//function to remove non-duplicate values
function removeNonDuplicates(arr) {
  return arr.filter((item, index) => {
    return arr.indexOf(item) !== index || arr.lastIndexOf(item) !== index;
  });
}

//iterate over each row of the sheet
const results = data.map((row) => {
  const result = [];
  //iterate over each cell in the row
  row.forEach((cell) => {
    //split the cell value by space to create an array of words
    const words = cell.toString().split(' ');
    //remove non-duplicate words
    const uniqueWords = removeNonDuplicates(words);
    //join the remaining words back to create a string value
    const newValue = uniqueWords.join(' ');
    //push the new value to the result array
    result.push(newValue);
  });
  return result;
});

//convert the results to CSV format
const csv = results.map(row => row.join(',')).join('\n');

//write the CSV data to a file
fs.writeFile('output.csv', csv, (err) => {
  if (err) throw err;
  console.log('CSV file saved.');
});
