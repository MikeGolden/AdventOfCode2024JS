def is_safe_report(report):
    """
    Determine if a report is safe without modifications.
    """
    differences = [report[i + 1] - report[i] for i in range(len(report) - 1)]

    # Check if all differences are valid (between 1 and 3 or -1 and -3)
    if not all(1 <= abs(diff) <= 3 for diff in differences):
        return False

    # Check if the report is strictly increasing or strictly decreasing
    return all(diff > 0 for diff in differences) or all(diff < 0 for diff in differences)


def is_safe_with_dampener(report):
    """
    Determine if a report can be made safe by removing one level.
    """
    if is_safe_report(report):
        return True

    # Try removing each level (except the first and last)
    for i in range(len(report)):
        modified_report = report[:i] + report[i + 1:]
        if is_safe_report(modified_report):
            return True

    return False


def count_safe_reports_with_dampener(file_path):
    """
    Count the number of safe reports considering the Problem Dampener.
    """
    with open(file_path, 'r') as file:
        lines = file.readlines()

    safe_count = 0
    for line in lines:
        report = list(map(int, line.strip().split()))
        if is_safe_with_dampener(report):
            safe_count += 1

    return safe_count


if __name__ == "__main__":
    input_file = "./input.txt"
    safe_reports = count_safe_reports_with_dampener(input_file)
    print(f"Number of safe reports: {safe_reports}")