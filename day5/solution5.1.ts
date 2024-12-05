import * as fs from "fs";

// Define a type for the ordering rules (X, Y)
type Rule = [number, number];

function parseInput(fileName: string): { rules: Rule[]; updates: number[][] } {
    /**
     * Reads the input file and parses the rules and updates.
     * - Rules: A list of tuples (X, Y) where X must be printed before Y.
     * - Updates: A list of arrays, each representing the pages for one update.
     */
    const data = fs.readFileSync(fileName, "utf-8").trim().split("\n\n");

    // Parse the rules as tuples of numbers
    const rules: Rule[] = data[0].split("\n").map(line => {
        const [x, y] = line.split("|").map(Number);
        return [x, y];
    });

    // Parse the updates as arrays of numbers
    const updates: number[][] = data[1].split("\n").map(line => line.split(",").map(Number));

    return { rules, updates };
}

function isValidUpdate(rules: Rule[], update: number[]): boolean {
    /**
     * Checks if an update respects all the ordering rules.
     * - Maps page numbers to their indices in the update.
     * - For each rule (X, Y), ensures that X appears before Y if both are present in the update.
     */
    const pageIndex = new Map(update.map((page, idx) => [page, idx]));

    for (const [x, y] of rules) {
        if (pageIndex.has(x) && pageIndex.has(y) && pageIndex.get(x)! > pageIndex.get(y)!) {
            return false; // Rule violated
        }
    }
    return true; // All rules satisfied
}

function calculateMiddlePagesSum(rules: Rule[], updates: number[][]): number {
    /**
     * Determines which updates are valid and calculates the sum of the middle pages of valid updates.
     * - Filters the updates to include only those that are valid.
     * - Finds the middle page of each valid update and computes their sum.
     */
    const validUpdates = updates.filter(update => isValidUpdate(rules, update));
    const middlePages = validUpdates.map(update => update[Math.floor(update.length / 2)]);
    return middlePages.reduce((sum, page) => sum + page, 0);
}

// Main execution
const { rules, updates } = parseInput("input.txt"); // Parse input file

// Calculate and output the result
const result = calculateMiddlePagesSum(rules, updates);
console.log(`Sum of middle pages: ${result}`);