"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function calculateTotalDistance(leftList, rightList) {
    // Step 1: Sort both lists
    leftList.sort(function (a, b) { return a - b; });
    rightList.sort(function (a, b) { return a - b; });
    // Step 2: Calculate the distances and sum them up
    var totalDistance = 0;
    for (var i = 0; i < leftList.length; i++) {
        totalDistance += Math.abs(leftList[i] - rightList[i]);
    }
    return totalDistance;
}
function parseInput(filePath) {
    var data = fs.readFileSync(filePath, "utf-8").trim();
    var lines = data.split("\n");
    if (lines.length < 2) {
        throw new Error("Input file must contain at least two lines.");
    }
    var leftList = lines[0].split(" ").map(Number);
    var rightList = lines[1].split(" ").map(Number);
    return [leftList, rightList];
}
// Main Execution
var inputFilePath = "input.txt";
try {
    var _a = parseInput(inputFilePath), leftList = _a[0], rightList = _a[1];
    var result = calculateTotalDistance(leftList, rightList);
    console.log("Total Distance:", result);
}
catch (error) {
    console.error("Error:", error.message);
}
