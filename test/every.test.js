import every from '../src/every';  

describe('every function', () => {

  // Testi taulukolla, jossa kaikki arvot täyttävät predikaatin
  it('should return true if all elements pass the predicate', () => {
    const result = every([2, 4, 6, 8], n => n % 2 === 0);
    expect(result).toBe(true);  // Kaikki arvot ovat parillisia, joten tulos on true
  });

  // Testi taulukolla, jossa yksi arvo ei täytä predikaattia
  it('should return false if any element does not pass the predicate', () => {
    const result = every([2, 3, 6, 8], n => n % 2 === 0);
    expect(result).toBe(false);  // Kolmonen ei ole parillinen, joten tulos on false
  });

  // Testi tyhjällä taulukolla
  it('should return true for an empty array', () => {
    const result = every([], n => n > 0);
    expect(result).toBe(true);  // Tyhjä taulukko, joten tulos on true (vakuuminen totuus)
  });
  
  // Testi null arvolla
  it('should return true for null', () => {
    const result = every(null, n => n > 0);
    expect(result).toBe(true);  // Null arvo, joten tulos on true (vakuuminen totuus)
  });

  // Testi, jossa predikaatti tarkistaa totuusarvot
  it('should return true when all elements are truthy', () => {
    const result = every([1, true, 'hello'], Boolean);
    expect(result).toBe(true);  // Kaikki arvot ovat totuuksia (1, true, 'hello')
  });

  // Testi, jossa on ainakin yksi arvo, joka ei ole totuusarvo
  it('should return false when at least one element is falsy', () => {
    const result = every([1, true, null, 'hello'], Boolean);
    expect(result).toBe(false);  // null ei ole totuusarvo, joten tulos on false
  });

  // Testi, jossa predikaatti tarkistaa, että elementit ovat suurempia kuin 0
  it('should return true when all elements are greater than 0', () => {
    const result = every([1, 2, 3, 4], n => n > 0);
    expect(result).toBe(true);  // Kaikki arvot ovat suurempia kuin 0
  });

  // Testi, jossa predikaatti tarkistaa, että elementit ovat negatiivisia
  it('should return false when not all elements are negative', () => {
    const result = every([-1, -2, -3, 4], n => n < 0);
    expect(result).toBe(false);  // Nelonen ei ole negatiivinen, joten tulos on false
  });

  // Testi, jossa predikaatti tarkistaa, että arvojen pituus on suurempi kuin 3
  it('should return false when not all elements have length greater than 3', () => {
    const result = every(['apple', 'banana', 'kiwi'], s => s.length > 3);
    expect(result).toBe(false);  // Kiwin pituus on 4, mutta ei ole suurempi kuin 3
  });

});
