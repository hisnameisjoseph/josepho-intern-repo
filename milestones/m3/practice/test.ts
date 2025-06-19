// milestones/m3/test/calculator.test.ts

import * as calculator from './calculator';

describe('calculator module', () => {
  test('adds numbers correctly', () => {
    expect(calculator.add(1, 0)).toBe(1);
  });

  test('subtracts numbers correctly', () => {
    expect(calculator.subtract(2025, 1998)).toBe(27);
  });

  test('multiplies numbers correctly', () => {
    expect(calculator.multiply(10, 3)).toBe(30);
  });

  test('divides numbers correctly', () => {
    expect(calculator.divide(10, 2)).toBe(5);
  });

  test('calculates power correctly', () => {
    expect(calculator.power(27, 1 / 3)).toBeCloseTo(3, 5);
  });

  test('throws error on divide by zero', () => {
    expect(() => calculator.divide(10, 0)).toThrow();
  });
});
