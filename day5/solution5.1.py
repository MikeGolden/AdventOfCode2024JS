def parse_input(file_name):
    with open(file_name, 'r') as file:
        data = file.read().strip().split("\n\n")
    rules = [tuple(map(int, line.split('|'))) for line in data[0].splitlines()]
    updates = [list(map(int, line.split(','))) for line in data[1].splitlines()]
    return rules, updates

def is_valid_update(rules, update):
    page_index = {page: idx for idx, page in enumerate(update)}
    for x, y in rules:
        if x in page_index and y in page_index and page_index[x] > page_index[y]:
            return False
    return True

def calculate_middle_pages_sum(rules, updates):
    valid_updates = [update for update in updates if is_valid_update(rules, update)]
    middle_pages = [update[len(update) // 2] for update in valid_updates]
    return sum(middle_pages)

if __name__ == "__main__":
    rules, updates = parse_input("input.txt")
    result = calculate_middle_pages_sum(rules, updates)
    print(f"Sum of middle pages: {result}")