// mathOperations.test.js
import { expect } from 'chai';
import { add, subtract, multiply, divide } from '../math.js';

describe('mathOperations', function () {

  // Yhteenlasku
  describe('add()', function () {
    it('should return the correct sum of two numbers', function () {
      const result = add(2, 3);
      expect(result).to.equal(5);
    });
    
    it('should return a negative sum when both numbers are negative', function () {
      const result = add(-2, -3);
      expect(result).to.equal(-5);
    });
  });

  // Vähennyslasku
  describe('subtract()', function () {
    it('should return the correct difference between two numbers', function () {
      const result = subtract(5, 3);
      expect(result).to.equal(2);
    });

    it('should return a negative result when subtracting a larger number from a smaller one', function () {
      const result = subtract(3, 5);
      expect(result).to.equal(-2);
    });
  });

  // Kertolasku
  describe('multiply()', function () {
    it('should return the correct product of two numbers', function () {
      const result = multiply(2, 3);
      expect(result).to.equal(6);
    });

    it('should return zero when multiplying by zero', function () {
      const result = multiply(5, 0);
      expect(result).to.equal(0);
    });
  });

  // Jakolasku
  describe('divide()', function () {
    it('should return the correct quotient when dividing two numbers', function () {
      const result = divide(6, 3);
      expect(result).to.equal(2);
    });

    it('should throw an error when dividing by zero', function () {
      expect(() => divide(6, 0)).to.throw('Cannot divide by zero');
    });
  });

});
