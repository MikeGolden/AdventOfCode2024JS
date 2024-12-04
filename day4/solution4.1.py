def count_xmas(grid):
    rows = len(grid)
    cols = len(grid[0])
    word = "XMAS"
    word_len = len(word)
    total_count = 0

    # Helper to check if the word fits in a specific direction
    def fits(r, c, dr, dc):
        for i in range(word_len):
            nr, nc = r + i * dr, c + i * dc
            if not (0 <= nr < rows and 0 <= nc < cols) or grid[nr][nc] != word[i]:
                return False
        return True

    # Directions: (row increment, column increment)
    directions = [
        (0, 1),  # right
        (1, 0),  # down
        (0, -1), # left
        (-1, 0), # up
        (1, 1),  # diagonal down-right
        (1, -1), # diagonal down-left
        (-1, 1), # diagonal up-right
        (-1, -1) # diagonal up-left
    ]

    for r in range(rows):
        for c in range(cols):
            for dr, dc in directions:
                if fits(r, c, dr, dc):
                    total_count += 1

    return total_count


# Read input grid from file
with open("input.txt", "r") as f:
    grid = [line.strip() for line in f.readlines()]

result = count_xmas(grid)
print(f"Total occurrences of XMAS: {result}")