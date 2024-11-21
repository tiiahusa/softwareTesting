import filter from '../src/filter';  

describe('filter function', () => {

  it('should return an array of elements that satisfy the predicate', () => {
    const users = [
      { 'user': 'barney', 'active': true },
      { 'user': 'fred', 'active': false }
    ];
    const result = filter(users, ({ active }) => active);
    expect(result).toEqual([{ 'user': 'barney', 'active': true }]);  
  });

  it('should return an empty array if no elements satisfy the predicate', () => {
    const users = [
      { 'user': 'barney', 'active': false },
      { 'user': 'fred', 'active': false }
    ];
    const result = filter(users, ({ active }) => active);
    expect(result).toEqual([[]]);  
  });

  it('should return an empty array for an empty input array', () => {
    const result = filter([], () => true);
    expect(result).toEqual([[]]);  
  });

  it('should return the same array when all elements satisfy the predicate', () => {
    const users = [
      { 'user': 'barney', 'active': true },
      { 'user': 'fred', 'active': true }
    ];
    const result = filter(users, ({ active }) => active);
    expect(result).toEqual([users]);  
  });

  it('should work with complex objects and custom predicates', () => {
    const users = [
      { 'user': 'barney', 'active': true, 'age': 30 },
      { 'user': 'fred', 'active': false, 'age': 40 },
      { 'user': 'wilma', 'active': true, 'age': 50 }
    ];
    const result = filter(users, ({ age }) => age > 35);
    expect(result).toEqual([{ 'user': 'wilma', 'active': true, 'age': 50 }]);  
  });

});
