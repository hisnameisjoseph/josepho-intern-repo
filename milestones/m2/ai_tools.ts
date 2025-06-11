// Returns the sum of all numbers in an array
function sumArray(numbers: number[]): number {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    return sum;
}

// Example usage:
const arr = [1, 2, 3, 4];
console.log(sumArray(arr)); // Expected: 10, Actual: 10