def count_x_mas(grid):
    rows = len(grid)
    cols = len(grid[0])
    pattern = "MAS"
    total_count = 0

    # Helper to check if the pattern fits in an X-MAS shape
    def fits_x_mas(r, c):
        # Check the X shape for the pattern "MAS" in both directions
        if (
            0 <= r - 1 < rows and 0 <= c - 1 < cols and grid[r - 1][c - 1] == pattern[0] and
            0 <= r < rows and 0 <= c < cols and grid[r][c] == pattern[1] and
            0 <= r + 1 < rows and 0 <= c + 1 < cols and grid[r + 1][c + 1] == pattern[2] and
            0 <= r - 1 < rows and 0 <= c + 1 < cols and grid[r - 1][c + 1] == pattern[0] and
            0 <= r + 1 < rows and 0 <= c - 1 < cols and grid[r + 1][c - 1] == pattern[2]
        ):
            return True
        return False

    for r in range(1, rows - 1):
        for c in range(1, cols - 1):
            if fits_x_mas(r, c):
                total_count += 1

    return total_count


# Read input grid from file
with open("input.txt", "r") as f:
    grid = [line.strip() for line in f.readlines()]

result = count_x_mas(grid)
print(f"Total occurrences of X-MAS: {result}")