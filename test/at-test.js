import { expect } from 'chai';
import at from '../src/at.js';  // Oikea polku 'at' tiedostoon

describe('at function', () => {
  it('should return the correct values for the given paths', () => {
    const object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
    const result = at(object, 'a[0].b.c', 'a[1]');
    expect(result).to.deep.equal([3, 4]);  // Tarkistetaan, että saadaan oikeat arvot
  });

  it('should return an empty array if no paths are provided', () => {
    const object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
    const result = at(object);
    expect(result).to.deep.equal([]);  // Ei annettu polkuja, palautetaan tyhjä taulukko
  });

  it('should return undefined for non-existing paths', () => {
    const object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
    const result = at(object, 'a[0].b.d', 'a[1].d');
    expect(result).to.deep.equal([undefined, undefined]);  // Ei löytynyt polkuja, palautetaan undefined
  });

  it('should handle nested paths correctly', () => {
    const object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
    const result = at(object, ['a[0].b.c', 'a[1]']);
    expect(result).to.deep.equal([3, 4]);  // Polut annettu taulukkona, palautetaan oikeat arvot
  });

  it('should handle arrays as paths', () => {
    const object = { 'a': [1, 2, 3] };
    const result = at(object, ['a[0]', 'a[2]']);
    expect(result).to.deep.equal([1, 3]);  // Taulukon polut, palautetaan oikeat arvot
  });

  it('should return undefined for paths that go out of bounds', () => {
    const object = { 'a': [1, 2, 3] };
    const result = at(object, 'a[5]');
    expect(result).to.deep.equal([undefined]);  // Polku menee pois rajalta, palautetaan undefined
  });

  it('should return an empty array if object is null', () => {
    const result = at(null, 'a[0].b.c');
    expect(result).to.deep.equal([undefined]);  // Objekti on null, palautetaan undefined
  });

  it('should return an empty array if object is undefined', () => {
    const result = at(undefined, 'a[0].b.c');
    expect(result).to.deep.equal([undefined]);  // Objekti on undefined, palautetaan undefined
  });
});
