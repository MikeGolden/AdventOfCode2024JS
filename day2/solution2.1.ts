import * as fs from "fs";

function isSafeReport(report: number[]): boolean {
    // Calculate the differences between adjacent levels
    const differences = report.slice(1).map((level, i) => level - report[i]);

    // Check if all differences are valid (between 1 and 3 or -1 and -3)
    if (!differences.every(diff => Math.abs(diff) >= 1 && Math.abs(diff) <= 3)) {
        return false;
    }

    // Check if the report is strictly increasing or strictly decreasing
    const allIncreasing = differences.every(diff => diff > 0);
    const allDecreasing = differences.every(diff => diff < 0);

    return allIncreasing || allDecreasing;
}

function countSafeReports(filePath: string): number {
    // Read and parse the input file
    const data = fs.readFileSync(filePath, "utf-8");
    const lines = data.trim().split("\n");

    let safeCount = 0;
    for (const line of lines) {
        const report = line.trim().split(" ").map(Number);
        if (isSafeReport(report)) {
            safeCount++;
        }
    }

    return safeCount;
}

// Main Execution
const inputFile = "input.txt";
const safeReports = countSafeReports(inputFile);
console.log(`Number of safe reports: ${safeReports}`);