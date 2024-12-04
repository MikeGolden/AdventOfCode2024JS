import * as fs from "fs";

function countXMAS(grid: string[]): number {
    const rows = grid.length;
    const cols = grid[0].length;
    const word = "XMAS";
    const wordLen = word.length;
    let totalCount = 0;

    // Helper to check if the word fits in a specific direction
    function fits(r: number, c: number, dr: number, dc: number): boolean {
        for (let i = 0; i < wordLen; i++) {
            const nr = r + i * dr;
            const nc = c + i * dc;
            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || grid[nr][nc] !== word[i]) {
                return false;
            }
        }
        return true;
    }

    // Directions: [row increment, column increment]
    const directions: [number, number][] = [
        [0, 1],   // right
        [1, 0],   // down
        [0, -1],  // left
        [-1, 0],  // up
        [1, 1],   // diagonal down-right
        [1, -1],  // diagonal down-left
        [-1, 1],  // diagonal up-right
        [-1, -1], // diagonal up-left
    ];

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            for (const [dr, dc] of directions) {
                if (fits(r, c, dr, dc)) {
                    totalCount++;
                }
            }
        }
    }

    return totalCount;
}

// Read input grid from file
const grid = fs.readFileSync("input.txt", "utf-8").trim().split("\n");
const result = countXMAS(grid);
console.log(`Total occurrences of XMAS: ${result}`);