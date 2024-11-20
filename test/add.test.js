import { expect } from 'chai';
import add from '../src/add.js';  // Polku 'add' tiedostoon

describe('add function', () => {
  it('should return the correct sum of two positive numbers', () => {
    const result = add(6, 4);
    expect(result).to.equal(10);  
  });

  it('should return the correct sum when one number is negative', () => {
    const result = add(6, -4);
    expect(result).to.equal(2); 
  });

  it('should return the correct sum when both numbers are negative', () => {
    const result = add(-6, -4);
    expect(result).to.equal(-10);  
  });

  it('should return the correct sum when one number is zero', () => {
    const result = add(6, 0);
    expect(result).to.equal(6);  
  });

  it('should return zero when both numbers are zero', () => {
    const result = add(0, 0);
    expect(result).to.equal(0);  
  });

  it('should return the correct sum for floating point numbers', () => {
    const result = add(1.5, 2.3);
    expect(result).to.be.closeTo(3.8, 0.0001);  
  });

  it('should return the correct sum when both numbers are large', () => {
    const result = add(1e6, 2e6);
    expect(result).to.equal(3e6);  
  });
});