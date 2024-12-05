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

def reorder_update(rules, update):
    """
    Reorders a given update according to the rules.
    - Creates a directed graph from the rules.
    - Uses topological sorting to determine the correct order.
    """
    from collections import defaultdict, deque

    # Build graph and calculate in-degrees
    graph = defaultdict(list)
    in_degree = defaultdict(int)
    pages = set(update)

    for x, y in rules:
        if x in pages and y in pages:
            graph[x].append(y)
            in_degree[y] += 1
            in_degree[x] += 0  # Ensure x is in the in-degree dictionary

    # Topological sort using Kahn's Algorithm
    queue = deque([page for page in update if in_degree[page] == 0])
    ordered = []

    while queue:
        current = queue.popleft()
        ordered.append(current)
        for neighbor in graph[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return ordered

def calculate_middle_pages_sum_after_reordering(rules, updates):
    """
    Finds the incorrectly-ordered updates, reorders them, and calculates the sum of their middle pages.
    """
    incorrectly_ordered = [update for update in updates if not is_valid_update(rules, update)]
    reordered_updates = [reorder_update(rules, update) for update in incorrectly_ordered]
    middle_pages = [update[len(update) // 2] for update in reordered_updates]
    return sum(middle_pages)

if __name__ == "__main__":
    # Parse input file
    rules, updates = parse_input("input.txt")
    
    # Calculate the sum of middle pages after reordering
    result = calculate_middle_pages_sum_after_reordering(rules, updates)
    
    # Output the result
    print(f"Sum of middle pages after reordering: {result}")