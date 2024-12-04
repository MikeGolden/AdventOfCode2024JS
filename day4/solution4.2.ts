import * as fs from "fs";

function countXMAS(grid: string[]): number {
    const rows = grid.length;
    const cols = grid[0].length;
    let totalCount = 0;

    // Helper to check if X-MAS pattern exists at center (r, c)
    function isXMAS(r: number, c: number): boolean {
        if (
            r - 1 >= 0 && r + 1 < rows &&
            c - 1 >= 0 && c + 1 < cols
        ) {
            // Extract diagonals
            const topLeft = grid[r - 1][c - 1];
            const bottomRight = grid[r + 1][c + 1];
            const topRight = grid[r - 1][c + 1];
            const bottomLeft = grid[r + 1][c - 1];

            // Check for MAS in both diagonals
            const diagonal1 = topLeft + grid[r][c] + bottomRight;
            const diagonal2 = topRight + grid[r][c] + bottomLeft;

            return (
                (diagonal1 === "MAS" || diagonal1 === "SAM") &&
                (diagonal2 === "MAS" || diagonal2 === "SAM")
            );
        }
        return false;
    }

    // Traverse the grid
    for (let r = 1; r < rows - 1; r++) {
        for (let c = 1; c < cols - 1; c++) {
            if (grid[r][c] === "A" && isXMAS(r, c)) {
                totalCount++;
            }
        }
    }

    return totalCount;
}

// Read the grid from the input file
const grid = fs.readFileSync("input.txt", "utf-8").trim().split("\n");

const result = countXMAS(grid);
console.log(`Total occurrences of X-MAS: ${result}`);