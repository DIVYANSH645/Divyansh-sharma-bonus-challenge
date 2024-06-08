const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

// Define the input and output file paths
const inputPath = path.resolve('C:\\Users\\Divyansh\\Desktop\\bonus assignment\\computers.csv');
const outputPath = path.resolve('C:\\Users\\Divyansh\\Desktop\\bonus assignment\\output.json');

// Function to validate file existence
function validateFilePath(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
}

// Function to read CSV file and transform data
function transformCSVtoJSON(inputPath, outputPath) {
  validateFilePath(inputPath);

  const results = [];

  fs.createReadStream(inputPath)
    .pipe(csv())
    .on('data', (data) => {
      // Transform each row into a desired JSON format
      results.push({
        productID: data['Product ID'],
        name: data['Name'],
        price: parseFloat(data['Price']),
      });
    })
    .on('end', () => {
      // Write the transformed data to the output file
      fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
      console.log(`Successfully written to ${outputPath}`);
    })
    .on('error', (error) => {
      console.error(`Error processing CSV file: ${error.message}`);
    });
}

// Main function to execute the transformation
function main() {
  try {
    transformCSVtoJSON(inputPath, outputPath);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();
