const fs = require('fs');

// Read the contents of the text file
const fileContents = fs.readFileSync('adfinv.txt', 'utf-8');

// Define a regular expression to match the pattern
const pattern = /data-sa-idt=([^=]*)/g;

// Create an array to hold the matches
const matches = [];

// Loop through the file contents and find all matches of the pattern
let match;
while (match = pattern.exec(fileContents)) {
  matches.push(match[1]); // capture group 1 contains the data between the quotes
}

// Convert the matches to CSV format
const csv = matches.map(match => `"${match}"`).join(',');

// Write the CSV to a file
fs.writeFileSync('matches.csv', csv);

// Print a success message
console.log(`Successfully exported ${matches.length} matches to matches.csv`);
