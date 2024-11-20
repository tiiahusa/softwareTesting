import difference from '../src/difference';  

describe('difference function', () => {

  // Testi: Varmistetaan, että ero palautetaan oikein perus tapauksessa
  it('should return the difference between two arrays', () => {
    const result = difference([2, 1], [2, 3]);
    expect(result).toEqual([1]);  // Ero [2, 3] poistaa arvon 2 ja jättää arvon 1
  });

  // Testi: Varmistetaan, että ero toimii useilla taulukoilla
  it('should return the difference when multiple arrays are provided', () => {
    const result = difference([2, 1, 3, 4, 5], [2, 3], [4]);
    expect(result).toEqual([1, 5]);  // Ero: 2, 3 ja 4 poistetaan, jää 1 ja 5
  });

  // Testi: Varmistetaan, että taulukot, jotka eivät ole `array-like`, palauttavat tyhjän taulukon
  it('should return an empty array if the first argument is not an array-like object', () => {
    const result = difference(null, [2, 3]);
    expect(result).toEqual([]);  // null ei ole array-like, joten palautetaan tyhjä taulukko

    const result2 = difference(undefined, [2, 3]);
    expect(result2).toEqual([]);  // undefined ei ole array-like, joten palautetaan tyhjä taulukko
  });

  // Testi: Varmistetaan, että taulukon, joka on tyhjä, käsittely toimii oikein
  it('should return the same array if no values to exclude are provided', () => {
    const result = difference([2, 1, 3]);
    expect(result).toEqual([2, 1, 3]);  // Jos ei anneta arvoja poissulkemiseen, palautetaan alkuperäinen taulukko
  });

  // Testi: Varmistetaan, että jos arvot löytyvät kaikista taulukoista, palautetaan tyhjä taulukko
  it('should return an empty array if all values are excluded', () => {
    const result = difference([1, 2, 3], [1, 2, 3]);
    expect(result).toEqual([]);  // Kaikki arvot löytyvät poissulkemisesta, palautetaan tyhjä taulukko
  });

  // Testi: Varmistetaan, että funktio toimii, kun syötteissä on duplikaatteja
  it('should handle duplicate values in the arrays correctly', () => {
    const result = difference([2, 2, 1], [2, 3]);
    expect(result).toEqual([1]);  // Duplikaattia 2 ei lisätä tulokseen, vain 1 jää
  });

  // Testi: Varmistetaan, että eron laskeminen tyhjästä taulukosta toimii
  it('should return the original array when the second array is empty', () => {
    const result = difference([1, 2, 3], []);
    expect(result).toEqual([1, 2, 3]);  // Ei poissulkemista, alkuperäinen taulukko palautetaan
  });

  // Testi: Varmistetaan, että ero toimii syötteissä, joissa on objekteja
  it('should correctly calculate the difference with objects in the array', () => {
    const result = difference([{a: 1}, {b: 2}], [{a: 1}]);
    expect(result).toEqual([{b: 2}]);  // Objekti {a: 1} poistetaan, jäljelle jää [{b: 2}]
  });

  // Testi: Varmistetaan, että funktio toimii `isArrayLikeObject`-tarkistuksen jälkeen
  it('should only proceed if the first argument is array-like', () => {
    const result = difference('notArray', [2, 3]);
    expect(result).toEqual([]);  // Ei ole array-like, palautetaan tyhjä taulukko
  });

});

