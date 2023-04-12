// Import the File System module
const fs = require('fs');

// Import PapaParse library
const Papa = require('papaparse');

// Your CSV file path
const filePath = 'finallist.csv';

// Read the CSV data from the file
const csvData = fs.readFileSync(filePath, 'utf8');

// Parse the CSV string
const csvParsed = Papa.parse(csvData);

// Loop through each row and cell, removing duplicates
csvParsed.data.forEach((row, rowIndex) => {
  row.forEach((cell, cellIndex) => {
    // Split the cell's value into an array of words
    const words = cell.split(' ');
    // Create a new array to hold unique words
    const uniqueWords = [];
    // Loop through each word and add to uniqueWords if it hasn't been added before
    words.forEach((word) => {
      if (!uniqueWords.includes(word)) {
        uniqueWords.push(word);
      }
    });
    // Join the uniqueWords array back into a string
    const cleanedValue = uniqueWords.join(' ');
    // Replace the original cell value with the cleaned value
    csvParsed.data[rowIndex][cellIndex] = cleanedValue;
  });
});

// Convert the parsed data back into a CSV string
const cleanedCsv = Papa.unparse(csvParsed.data);

// Write the cleaned CSV data to a new file
fs.writeFileSync('masterfinal.csv', cleanedCsv);

console.log('Cleaned CSV data written to file!');
