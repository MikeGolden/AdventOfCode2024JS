import * as fs from "fs";

function calculateTotalDistance(leftList: number[], rightList: number[]): number {
    // Step 1: Sort both lists
    leftList.sort((a, b) => a - b);
    rightList.sort((a, b) => a - b);

    // Step 2: Calculate the distances and sum them up
    let totalDistance = 0;
    for (let i = 0; i < leftList.length; i++) {
        totalDistance += Math.abs(leftList[i] - rightList[i]);
    }

    return totalDistance;
}

function parseInput(filePath: string): [number[], number[]] {
    const data = fs.readFileSync(filePath, "utf-8").trim();
    const lines = data.split("\n");

    if (lines.length < 2) {
        throw new Error("Input file must contain at least two lines.");
    }

    const leftList = lines[0].split(" ").map(Number);
    const rightList = lines[1].split(" ").map(Number);

    return [leftList, rightList];
}

// Main Execution
const inputFilePath = "input.txt";
try {
    const [leftList, rightList] = parseInput(inputFilePath);
    const result = calculateTotalDistance(leftList, rightList);
    console.log("Total Distance:", result);
} catch (error) {
    console.error("Error:", error.message);
}