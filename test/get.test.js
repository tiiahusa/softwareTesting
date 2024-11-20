import get from '../src/get.js';  // Oikea polku 'get' tiedostoon

describe('get function', () => {
  
  test('should return the correct value when path exists', () => {
    const object = { 'a': [{ 'b': { 'c': 3 } }] };
    const result = get(object, 'a[0].b.c');
    expect(result).toBe(3);  
  });

  test('should return the default value if path does not exist', () => {
    const object = { 'a': [{ 'b': { 'c': 3 } }] };
    const result = get(object, 'a[0].b.d', 0);
    expect(result).toBe(0); 
  });

  test('should return the correct value when path exists 2', () => {
    const object = { 'a': [{ 'b': { 'c': 3 } }] };
    const result = get(object, ['a', '0', 'b', 'c']);
    expect(result).toBe(3); 
  });

  test('should return the default value if path does not exist 2', () => {
    const object = { 'a': [{ 'b': { 'c': 3 } }] };
    const result = get(object, 'a.b.c', 1);
    expect(result).toBe(1); 
  });

  test('should return the default value if object is null', () => {
    const result = get(null, 'a[0].b.c', 'default');
    expect(result).toBe('default');  
  });
  
  test('should return the default value if object is undefined', () => {
    const result = get(undefined, 'a[0].b.c', 'default');
    expect(result).toBe('default');  
  });
  
  test('should handle empty path correctly', () => {
    const object = { 'a': 1 };
    const result = get(object, [], 'default');
    expect(result).toBe('default');  
  });

});
