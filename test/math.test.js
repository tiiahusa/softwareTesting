import { add, subtract, multiply, divide } from '../math.js';

describe('mathOperations', () => {

  // Yhteenlasku
  describe('add()', () => {
    test('should return the correct sum of two numbers', () => {
      const result = add(2, 3);
      expect(result).toBe(5);
    });

    test('should return a negative sum when both numbers are negative', () => {
      const result = add(-2, -3);
      expect(result).toBe(-5);
    });
  });

  // Vähennyslasku
  describe('subtract()', () => {
    test('should return the correct difference between two numbers', () => {
      const result = subtract(5, 3);
      expect(result).toBe(2);
    });

    test('should return a negative result when subtracting a larger number from a smaller one', () => {
      const result = subtract(3, 5);
      expect(result).toBe(-2);
    });
  });

  // Kertolasku
  describe('multiply()', () => {
    test('should return the correct product of two numbers', () => {
      const result = multiply(2, 3);
      expect(result).toBe(6);
    });

    test('should return zero when multiplying by zero', () => {
      const result = multiply(5, 0);
      expect(result).toBe(0);
    });
  });

  // Jakolasku
  describe('divide()', () => {
    test('should return the correct quotient when dividing two numbers', () => {
      const result = divide(6, 3);
      expect(result).toBe(2);
    });

    test('should throw an error when dividing by zero', () => {
      expect(() => divide(6, 0)).toThrow('Cannot divide by zero');
    });
  });

});
