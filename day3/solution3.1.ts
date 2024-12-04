import * as fs from "fs";

function sumValidMulResults(inputFile: string): number {
    // Read the input file
    const data = fs.readFileSync(inputFile, "utf8");

    // Regular expression to match valid mul(X,Y) instructions
    const pattern = /mul\((\d+),(\d+)\)/g;

    // Find all matches
    let match;
    let sum = 0;

    while ((match = pattern.exec(data)) !== null) {
        const x = parseInt(match[1], 10);
        const y = parseInt(match[2], 10);
        sum += x * y;
    }

    return sum;
}

// Example usage
const inputFile = "./input.txt";
console.log("Sum of valid mul results:", sumValidMulResults(inputFile));