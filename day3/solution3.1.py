import re

def sum_valid_mul_results(input_file):
    # Read the input file
    with open(input_file, "r") as file:
        data = file.read()
    
    # Regular expression to match valid mul(X,Y) instructions
    pattern = r"mul\((\d+),(\d+)\)"
    
    # Find all matches
    matches = re.findall(pattern, data)
    
    # Compute the sum of all valid multiplications
    result = sum(int(x) * int(y) for x, y in matches)
    
    return result

if __name__ == "__main__":
    input_file = "./input.txt"
    print("Sum of valid mul results:", sum_valid_mul_results(input_file))