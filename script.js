// Part 1 ALAB 308.3.1: Practical Loops
// Part 3: Feeling Loopy Original Code

function parseCSV(csvString) {
    let rows = csvString.split('\\n');
    
    for (let row of rows) {
        let cells = row.split(',');
        console.log(cells[0], cells[1], cells[2], cells[3]);
    }
}

// Data Collection Part 1: Refactoring Code

function parseCSV(csvString) {
    let rows = csvString.split('\n');
    
    for (let row of rows) {
        let cells = row.split(',');
        console.log(...cells);
    }
}

// In this refactored version, I changed `\\n` to `\n` in the `split()` function to split the string into rows
// Used the spread syntax `...cells` to log all the elements of the `cells` array without specifying each index

// Part 2: Expanding Functionality

function parseCSV(csvString) {
    let rows = csvString.split('\n');
    
    // Split the first row to get the number of columns
    let columns = rows[0].split(',');
    let numColumns = columns.length;
    
    // Create a two-dimensional array to store the data
    let data = [];
    
    // Store the first row as the heading row
    data.push(columns);
    
    // I Iterate over the remaining rows
    for (let i = 1; i < rows.length; i++) {
        let row = rows[i].split(',');
        // If the row is empty, skip it
        if (row.length === 1 && row[0] === '') continue;
        // If the row has fewer columns than expected, I padded it with empty strings
        while (row.length < numColumns) {
            row.push('');
        }
        // Add the row to the data array
        data.push(row);
    }
    
    return data;
}

let csvString = "ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor’s Assistant,26";

let parsedData = parseCSV(csvString);
console.log(parsedData);

// Part 3: Transforming Data

function convertRowsToObjects(data) {
    let headings = data[0];
    let objects = [];
    
    // Iterate over the rows starting from index 1 (skipped the heading row)
    for (let i = 1; i < data.length; i++) {
        let row = data[i];
        let obj = {};
        // Iterate over the columns and create key-value pairs in the object
        for (let j = 0; j < row.length; j++) {
            let key = headings[j].toLowerCase(); // I Converted keys to lowercase. Each row was converted into an object and keys are headings and the values are corresponding row values
            obj[key] = row[j];
        }
        objects.push(obj);
    }
    
    return objects;
}

let data = [["ID", "Name", "Occupation", "Age"],
            ["42", "Bruce", "Knight", "41"],
            ["57", "Bob", "Fry Cook", "19"],
            ["63", "Blaine", "Quiz Master", "58"],
            ["98", "Bill", "Doctor’s Assistant", "26"]];

let objects = convertRowsToObjects(data);
console.log(objects);

// Part 4: Sorting and Manipulating Data
// Removed the last element from the array
objects.splice(-1, 1);

// Inserted the object at index 1
let newObject = { id: "48", name: "Barry", occupation: "Runner", age: "25" };
objects.splice(1, 0, newObject);

// Add the object to the end of the array
let endObject = { id: "7", name: "Bilbo", occupation: "None", age: "111" };
objects.push(endObject);

// Calculated the average age
let totalAge = 0;
objects.forEach(obj => totalAge += parseInt(obj.age));
let averageAge = totalAge / objects.length;

console.log(objects);
console.log("Average age:", averageAge);

// Part 5: Full Circle

// Remove the last element from the array
objects.pop();

// Insert the object at index 1
let newObject = { id: "48", name: "Barry", occupation: "Runner", age: "25" };
objects.splice(1, 0, newObject);

// Add the object to the end of the array
let endObject = { id: "7", name: "Bilbo", occupation: "None", age: "111" };
objects.push(endObject);

// Calculate the average age
let totalAge = 0;
for (let obj of objects) {
    totalAge += parseInt(obj.age);
}
let averageAge = totalAge / objects.length;

// Transform objects back into CSV format
let csvString = '';
let headings = Object.keys(objects[0]);
csvString += headings.join(',') + '\n';
objects.forEach(obj => {
    let values = headings.map(key => obj[key]);
    csvString += values.join(',') + '\n';
});

console.log(objects);
console.log("Average age:", averageAge);
console.log("CSV format:\n", csvString);