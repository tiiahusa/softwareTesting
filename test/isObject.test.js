import isObject from '../src/isObject';  

describe('isObject function', () => {

  it('should return true for a plain object', () => {
    const result = isObject({});
    expect(result).toBe(true);
  });

  it('should return true for an array', () => {
    const result = isObject([1, 2, 3]);
    expect(result).toBe(true);
  });

  it('should return true for a function', () => {
    const result = isObject(function() {});
    expect(result).toBe(true);
  });

  it('should return true for a Date object', () => {
    const result = isObject(new Date());
    expect(result).toBe(true);
  });

  it('should return false for null', () => {
    const result = isObject(null);
    expect(result).toBe(false);
  });

  it('should return false for a primitive string', () => {
    const result = isObject('Hello');
    expect(result).toBe(false);
  });

  it('should return false for a number', () => {
    const result = isObject(42);
    expect(result).toBe(false);
  });

  it('should return false for a boolean', () => {
    const result = isObject(true);
    expect(result).toBe(false);
  });

  it('should return false for undefined', () => {
    const result = isObject(undefined);
    expect(result).toBe(false);
  });

  it('should return true for an object wrapped in a constructor function (e.g. new String, new Number)', () => {
    const result1 = isObject(new String('Hello'));
    const result2 = isObject(new Number(42));
    expect(result1).toBe(true);
    expect(result2).toBe(true);
  });

});
