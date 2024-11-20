import memoize from '../src/memoize';  

describe('memoize function', () => {

  // Testi: Varmistetaan, että memoize palauttaa oikean tuloksen ensimmäisellä kutsulla
  it('should return the correct result for the first call', () => {
    const add = (a, b) => a + b;
    const memoizedAdd = memoize(add);

    expect(memoizedAdd(1, 2)).toBe(3);  // Ensimmäinen kutsu: tulos on laskettu
  });

  // Testi: Varmistetaan, että memoize muistaa aiemman laskennan ja käyttää välimuistia
  it('should return cached result for the same arguments', () => {
    const add = (a, b) => a + b;
    const memoizedAdd = memoize(add);

    memoizedAdd(1, 2);  // Ensimmäinen kutsu
    expect(memoizedAdd(1, 2)).toBe(3);  // Toinen kutsu: välimuistista otettu tulos
  });

  // Testi: Varmistetaan, että välimuisti toimii eri argumenteilla
  it('should return different result for different arguments', () => {
    const add = (a, b) => a + b;
    const memoizedAdd = memoize(add);

    expect(memoizedAdd(1, 2)).toBe(3);  // Ensimmäinen kutsu
    expect(memoizedAdd(2, 3)).toBe(5);  // Eri argumentit, eri tulos
  });

  // Testi: Varmistetaan, että resolver toimii oikein (kustomoitu välimuisti)
  it('should use resolver to generate the cache key', () => {
    const add = (a, b) => a + b;
    const customResolver = (a, b) => a * b;  // Käytetään kertolaskua välimuistin avaimena
    const memoizedAdd = memoize(add, customResolver);

    expect(memoizedAdd(2, 3)).toBe(5);  // Ensimmäinen kutsu
    expect(memoizedAdd(3, 2)).toBe(5);  // Eri järjestys, mutta sama avain (6)
  });

  // Testi: Varmistetaan, että väärin annettu resolverin tyyppi heittää virheen
  it('should throw an error if resolver is not a function', () => {
    const add = (a, b) => a + b;

    expect(() => memoize(add, 'notAFunction')).toThrow(TypeError);  // Resolverin pitää olla funktio
  });

  // Testi: Varmistetaan, että virheellinen syöte funktiolle heittää virheen
  it('should throw an error if func is not a function', () => {
    expect(() => memoize('notAFunction')).toThrow(TypeError);  // Funktio pitää olla funktio
  });

  // Testi: Varmistetaan, että välimuistin käyttäminen on mahdollista
  it('should allow modifying the cache directly', () => {
    const add = (a, b) => a + b;
    const memoizedAdd = memoize(add);

    memoizedAdd(1, 2);  // Ensimmäinen kutsu
    expect(memoizedAdd.cache.has(1)).toBe(true);  // Välimuistiin tallennettu avain
    expect(memoizedAdd.cache.get(1)).toBe(3);  // Välimuistissa tulos 3

    // Muutetaan välimuistia suoraan
    memoizedAdd.cache.set(1, 99);
    expect(memoizedAdd(1, 2)).toBe(99);  // Välimuistista otetaan muokattu arvo
  });

  // Testi: Varmistetaan, että `memoize.Cache` voi olla muokattu
  it('should allow replacing memoize.Cache with another cache constructor', () => {
    memoize.Cache = WeakMap;  // Vaihdetaan välimuistin konstruktoriksi WeakMap
    const add = (a, b) => a + b;
    const memoizedAdd = memoize(add);

    expect(memoizedAdd.cache instanceof WeakMap).toBe(true);  // Varmistetaan, että käytetään WeakMap
  });
});
