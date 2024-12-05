import * as fs from "fs";

type Rule = [number, number];

function parseInput(fileName: string): { rules: Rule[]; updates: number[][] } {
    /**
     * Reads the input file and parses the rules and updates.
     * - Rules: A list of tuples (X, Y) where X must be printed before Y.
     * - Updates: A list of arrays, each representing the pages for one update.
     */
    const data = fs.readFileSync(fileName, "utf-8").trim().split("\n\n");

    const rules: Rule[] = data[0].split("\n").map(line => {
        const [x, y] = line.split("|").map(Number);
        return [x, y];
    });

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

function reorderUpdate(rules: Rule[], update: number[]): number[] {
    /**
     * Reorders a given update according to the rules.
     * - Creates a directed graph from the rules.
     * - Uses topological sorting to determine the correct order.
     */
    const graph: Map<number, number[]> = new Map();
    const inDegree: Map<number, number> = new Map();

    const pages = new Set(update);

    // Build graph and calculate in-degrees
    rules.forEach(([x, y]) => {
        if (pages.has(x) && pages.has(y)) {
            if (!graph.has(x)) graph.set(x, []);
            graph.get(x)!.push(y);
            inDegree.set(y, (inDegree.get(y) || 0) + 1);
            if (!inDegree.has(x)) inDegree.set(x, 0);
        }
    });

    // Topological sort using Kahn's Algorithm
    const queue: number[] = update.filter(page => (inDegree.get(page) || 0) === 0);
    const ordered: number[] = [];

    while (queue.length > 0) {
        const current = queue.shift()!;
        ordered.push(current);
        (graph.get(current) || []).forEach(neighbor => {
            inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
            if (inDegree.get(neighbor) === 0) queue.push(neighbor);
        });
    }

    return ordered;
}

function calculateMiddlePagesSumAfterReordering(rules: Rule[], updates: number[][]): number {
    /**
     * Finds the incorrectly-ordered updates, reorders them, and calculates the sum of their middle pages.
     */
    const incorrectlyOrdered = updates.filter(update => !isValidUpdate(rules, update));
    const reorderedUpdates = incorrectlyOrdered.map(update => reorderUpdate(rules, update));
    const middlePages = reorderedUpdates.map(update => update[Math.floor(update.length / 2)]);
    return middlePages.reduce((sum, page) => sum + page, 0);
}

// Main execution
const { rules, updates } = parseInput("input.txt"); // Parse input file

// Calculate and output the result
const result = calculateMiddlePagesSumAfterReordering(rules, updates);
console.log(`Sum of middle pages after reordering: ${result}`);