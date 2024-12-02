import * as fs from "fs";

function part1(): number {
    const left: number[] = [];
    const right: number[] = [];

    // Read the file and parse the input
    const lines = fs.readFileSync("./input.txt", "utf-8").split("\n");
    for (const line of lines) {
        if (line.trim()) {
            const [leftNumber, rightNumber] = line
                .trim()
                .split(" ")
                .filter((item) => item)
                .map((item) => parseInt(item, 10));
            left.push(leftNumber);
            right.push(rightNumber);
        }
    }

    // Sort both arrays
    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);

    // Calculate the total distance
    let distance = 0;
    for (let i = 0; i < left.length; i++) {
        distance += Math.abs(left[i] - right[i]);
    }

    console.log(distance);
    return distance;
}

part1();