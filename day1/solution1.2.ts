import * as fs from "fs";

function part2(): number {
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

    // Create a frequency counter for the right list
    const counter: Record<number, number> = {};
    for (const num of right) {
        counter[num] = (counter[num] || 0) + 1;
    }

    // Calculate the similarity score
    let similarity = 0;
    for (const num of left) {
        similarity += num * (counter[num] || 0);
    }

    console.log(similarity);
    return similarity;
}

part2();