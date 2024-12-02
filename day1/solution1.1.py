def calculate_total_distance(left_list, right_list):
    """
    Calculate the total distance between two lists.
    """
    # Step 1: Sort both lists
    left_list.sort()
    right_list.sort()

    # Step 2: Calculate the total distance
    total_distance = sum(abs(l - r) for l, r in zip(left_list, right_list))
    return total_distance


def parse_input(file_path):
    """
    Parse the input file and return two lists of numbers.
    """
    with open(file_path, 'r') as file:
        lines = file.readlines()

    if len(lines) < 2:
        raise ValueError("Input file must contain at least two lines.")

    left_list = list(map(int, lines[0].strip().split()))
    right_list = list(map(int, lines[1].strip().split()))

    return left_list, right_list


if __name__ == "__main__":
    input_file_path = "input.txt"

    try:
        # Parse input and calculate the total distance
        left_list, right_list = parse_input(input_file_path)
        result = calculate_total_distance(left_list, right_list)
        print("Total Distance:", result)
    except Exception as e:
        print("Error:", str(e))