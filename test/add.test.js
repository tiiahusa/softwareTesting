import add from '../src/add.js';  // Polku 'add' tiedostoon

describe('add function', () => {
  test('should return the correct sum of two positive numbers', () => {
    const result = add(6, 4);
    expect(result).toBe(10);  // Mocha's .to.equal -> Jest's .toBe
  });

  test('should return the correct sum when one number is negative', () => {
    const result = add(6, -4);
    expect(result).toBe(2); 
  });

  test('should return the correct sum when both numbers are negative', () => {
    const result = add(-6, -4);
    expect(result).toBe(-10);  
  });

  test('should return the correct sum when one number is zero', () => {
    const result = add(6, 0);
    expect(result).toBe(6);  
  });

  test('should return zero when both numbers are zero', () => {
    const result = add(0, 0);
    expect(result).toBe(0);  
  });

  test('should return the correct sum for floating point numbers', () => {
    const result = add(1.5, 2.3);
    expect(result).toBeCloseTo(3.8, 4);  // Mocha's .to.be.closeTo -> Jest's .toBeCloseTo
  });

  test('should return the correct sum when both numbers are large', () => {
    const result = add(1e6, 2e6);
    expect(result).toBe(3e6);  
  });
});
