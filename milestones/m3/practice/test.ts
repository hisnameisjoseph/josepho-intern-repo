import * as calculator from "./calculator";

try {
  console.log(calculator.add(1, 0));           // Expect: 1
  console.log(calculator.subtract(2025, 1998)); // Expect: 27
  console.log(calculator.multiply(10, 3));      // Expect: 30
  console.log(calculator.divide(10, 2));        // Expect: 5
  console.log(calculator.power(27, 1/3));       // Expect: 3
  console.log(calculator.divide(10, 0));        // Should throw error
} catch (err: any) {
  console.error("Error:", err.message);
}
