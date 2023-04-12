const fs = require('fs');
const csv = require('csv-parser');
const fastCsv = require('fast-csv');

// Read CSV file
const rows = [];
fs.createReadStream('output.csv')
  .pipe(csv())
  .on('data', (row) => {
    rows.push(row);
  })
  .on('end', () => {
    // Remove duplicates in each value
    const uniqueRows = rows.map((row) => {
      const uniqueRow = {};
      Object.keys(row).forEach((key) => {
        const value = row[key].split(' - ');
        const uniqueValue = Array.from(new Set(value)).join(' - ');
        uniqueRow[key] = uniqueValue;
      });
      return uniqueRow;
    });

    // Write unique rows to new CSV file
    const ws = fs.createWriteStream('finallist.csv');
    fastCsv.write(uniqueRows, { headers: true }).pipe(ws);
  });
