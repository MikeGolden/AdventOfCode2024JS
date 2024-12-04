import * as fs from "fs";

function countXMAS(grid: string[]): number {
    const rows = grid.length;
    const cols = grid[0].length;
    const pattern = "MAS";
    let totalCount = 0;

    // Helper to check if the pattern fits in an X-MAS shape
    function fitsXMAS(r: number, c: number): boolean {
        return (
            r - 1 >= 0 && c - 1 >= 0 && grid[r - 1][c - 1] === pattern[0] &&
            grid[r][c] === pattern[1] &&
            r + 1 < rows && c + 1 < cols && grid[r + 1][c + 1] === pattern[2] &&
            r - 1 >= 0 && c + 1 < cols && grid[r - 1][c + 1] === pattern[0] &&
            r + 1 < rows && c - 1 >= 0 && grid[r + 1][c - 1] === pattern[2]
        );
    }

    for (let r = 1; r < rows - 1; r++) {
        for (let c = 1; c < cols - 1; c++) {
            if (fitsXMAS(r, c)) {
                totalCount++;
            }
        }
    }

    return totalCount;
}

// Read input grid from file
const grid = fs.readFileSync("input.txt", "utf-8").trim().split("\n");
const result = countXMAS(grid);
console.log(`Total occurrences of X-MAS: ${result}`);