def count_x_mas(grid):
    rows = len(grid)
    cols = len(grid[0])
    total_count = 0

    # Helper function to check X-MAS pattern at center (r, c)
    def is_x_mas(r, c):
        if (
            0 <= r - 1 < rows and 0 <= r + 1 < rows and
            0 <= c - 1 < cols and 0 <= c + 1 < cols
        ):
            # Extract diagonals
            top_left = grid[r - 1][c - 1]
            bottom_right = grid[r + 1][c + 1]
            top_right = grid[r - 1][c + 1]
            bottom_left = grid[r + 1][c - 1]

            # Check for MAS in both diagonals
            diagonal_1 = top_left + grid[r][c] + bottom_right
            diagonal_2 = top_right + grid[r][c] + bottom_left

            return (diagonal_1 in ("MAS", "SAM") and diagonal_2 in ("MAS", "SAM"))
        return False

    # Traverse the grid
    for r in range(1, rows - 1):
        for c in range(1, cols - 1):
            if grid[r][c] == "A" and is_x_mas(r, c):
                total_count += 1

    return total_count


# Read the grid from the input file
with open("input.txt", "r") as f:
    grid = [line.strip() for line in f.readlines()]

result = count_x_mas(grid)
print(f"Total occurrences of X-MAS: {result}")