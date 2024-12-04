import * as fs from "fs";

function calculateEnabledMultiplications(filePath: string): number {
    const memory = fs.readFileSync(filePath, "utf-8");

    // Regex patterns
    const mulPattern = /mul\((\d+),(\d+)\)/g;
    const togglePattern = /do\(\)|don't\(\)/g;

    // Extract instructions
    const instructions = [
        ...Array.from(memory.matchAll(togglePattern)).map(match => ({
            index: match.index!,
            type: match[0]
        })),
        ...Array.from(memory.matchAll(mulPattern)).map(match => ({
            index: match.index!,
            type: "mul",
            x: parseInt(match[1], 10),
            y: parseInt(match[2], 10)
        }))
    ].sort((a, b) => a.index - b.index);

    // Initialize state
    let mulEnabled = true;
    let total = 0;

    for (const instr of instructions) {
        if (instr.type === "do()") {
            mulEnabled = true;
        } else if (instr.type === "don't()") {
            mulEnabled = false;
        } else if (instr.type === "mul" && mulEnabled) {
            total += instr.x * instr.y;
        }
    }

    return total;
}

// Example usage
const result = calculateEnabledMultiplications("input.txt");
console.log(`Total sum of enabled multiplications: ${result}`);