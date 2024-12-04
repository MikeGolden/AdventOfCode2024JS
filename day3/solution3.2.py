import re

def calculate_enabled_multiplications(file_path):
    # Read the input file
    with open(file_path, 'r') as f:
        memory = f.read()

    # Regex to find valid mul(X,Y) instructions
    mul_pattern = re.compile(r"mul\((\d+),(\d+)\)")
    # Regex to find do() and don't() instructions
    toggle_pattern = re.compile(r"(do\(\)|don't\(\))")

    # Find all instructions in the order they appear
    instructions = toggle_pattern.findall(memory) + mul_pattern.findall(memory)
    instructions = sorted(
        [(m.start(), m.group()) for m in toggle_pattern.finditer(memory)] +
        [(m.start(), ("mul", int(m.group(1)), int(m.group(2)))) for m in mul_pattern.finditer(memory)],
        key=lambda x: x[0]
    )

    # Initialize state
    mul_enabled = True
    total = 0

    for _, instr in instructions:
        if instr == "do()":
            mul_enabled = True
        elif instr == "don't()":
            mul_enabled = False
        elif isinstance(instr, tuple) and instr[0] == "mul":
            if mul_enabled:
                total += instr[1] * instr[2]

    return total

# Example usage
result = calculate_enabled_multiplications("input.txt")
print(f"Total sum of enabled multiplications: {result}")