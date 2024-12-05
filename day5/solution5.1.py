def parse_input(file_name):
    """
    Reads the input file and parses the rules and updates.
    - Rules: A list of tuples (X, Y) indicating X must be printed before Y.
    - Updates: A list of lists, where each inner list contains the page numbers for one update.
    """
    with open(file_name, 'r') as file:
        data = file.read().strip().split("\n\n")
    rules = [tuple(map(int, line.split('|'))) for line in data[0].splitlines()]
    updates = [list(map(int, line.split(','))) for line in data[1].splitlines()]
    return rules, updates

def is_valid_update(rules, update):
    """
    Checks if an update respects all the ordering rules.
    - Constructs a dictionary mapping page numbers to their indices in the update.
    - Verifies if for every rule (X, Y), X appears before Y in the update.
    """
    page_index = {page: idx for idx, page in enumerate(update)}
    for x, y in rules:
        if x in page_index and y in page_index and page_index[x] > page_index[y]:
            return False
    return True

def calculate_middle_pages_sum(rules, updates):
    """
    Determines which updates are valid and calculates the sum of the middle pages of valid updates.
    - Filters the list of updates to keep only valid ones.
    - Finds the middle page for each valid update and sums them up.
    """
    valid_updates = [update for update in updates if is_valid_update(rules, update)]
    middle_pages = [update[len(update) // 2] for update in valid_updates]
    return sum(middle_pages)

if __name__ == "__main__":
    # Parse input file to get rules and updates
    rules, updates = parse_input("input.txt")
    
    # Calculate the sum of middle pages for valid updates
    result = calculate_middle_pages_sum(rules, updates)
    
    # Output the result
    print(f"Sum of middle pages: {result}")