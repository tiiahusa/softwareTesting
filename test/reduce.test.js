import reduce from '../src/reduce';  

describe('reduce function', () => {

  // Testi taulukon kanssa
  it('should reduce an array with an initial accumulator', () => {
    const result = reduce([1, 2, 3], (sum, n) => sum + n, 0);
    expect(result).toBe(6);  // 1 + 2 + 3 = 6
  });

  it('should reduce an array without an initial accumulator', () => {
    const result = reduce([1, 2, 3], (sum, n) => sum + n);
    expect(result).toBe(6);  // 1 + 2 + 3 = 6 (ilman initial accumulatoria)
  });

  it('should correctly handle an empty array with an initial accumulator', () => {
    const result = reduce([], (sum, n) => sum + n, 0);
    expect(result).toBe(0);  // Empty array, initial accumulator is 0
  });

  it('should correctly handle an empty array without an initial accumulator', () => {
    const result = reduce([], (sum, n) => sum + n);
    expect(result).toBe(undefined);  // No elements, so undefined is returned
  });

  // Testi objektin kanssa
  it('should reduce an object with an initial accumulator', () => {
    const result = reduce({a: 1, b: 2, c: 3}, (sum, value) => sum + value, 0);
    expect(result).toBe(6);  // 1 + 2 + 3 = 6
  });

  it('should reduce an object without an initial accumulator', () => {
    const result = reduce({a: 1, b: 2, c: 3}, (sum, value) => sum + value);
    expect(result).toBe(6);  // 1 + 2 + 3 = 6 (ilman initial accumulatoria)
  });

  it('should return the object values accumulated in an array-like format', () => {
    const result = reduce({a: 1, b: 2, c: 3}, (result, value) => {
      result.push(value);
      return result;
    }, []);
    expect(result).toEqual([1, 2, 3]);  // Should return the values as an array
  });

  // Erilaisia testitapauksia
  it('should handle non-object and non-array collections gracefully', () => {
    const result = reduce(123, (sum, n) => sum + n, 0);
    expect(result).toBe(0);  // Should not attempt to reduce a non-iterable
  });

  it('should work with an initial accumulator of different types', () => {
    const result = reduce([1, 2, 3], (concatStr, n) => concatStr + n, '');
    expect(result).toBe('123');  // Accumulator is an empty string, so it concatenates the numbers
  });

});
