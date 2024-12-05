import * as fs from "fs";

type Rule = [number, number];

function parseInput(fileName: string): { rules: Rule[]; updates: number[][] } {
    const data = fs.readFileSync(fileName, "utf-8").trim().split("\n\n");
    const rules: Rule[] = data[0].split("\n").map(line => {
        const [x, y] = line.split("|").map(Number);
        return [x, y];
    });
    const updates: number[][] = data[1].split("\n").map(line => line.split(",").map(Number));
    return { rules, updates };
}

function isValidUpdate(rules: Rule[], update: number[]): boolean {
    const pageIndex = new Map(update.map((page, idx) => [page, idx]));
    for (const [x, y] of rules) {
        if (pageIndex.has(x) && pageIndex.has(y) && pageIndex.get(x)! > pageIndex.get(y)!) {
            return false;
        }
    }
    return true;
}

function calculateMiddlePagesSum(rules: Rule[], updates: number[][]): number {
    const validUpdates = updates.filter(update => isValidUpdate(rules, update));
    const middlePages = validUpdates.map(update => update[Math.floor(update.length / 2)]);
    return middlePages.reduce((sum, page) => sum + page, 0);
}

const { rules, updates } = parseInput("input.txt");
const result = calculateMiddlePagesSum(rules, updates);
console.log(`Sum of middle pages: ${result}`);