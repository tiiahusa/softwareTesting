import isBuffer from '../src/isBuffer';  

describe('isBuffer function', () => {

  // Testi, jossa tarkistetaan Buffer-olio
  it('should return true for a Buffer object', () => {
    const buffer = Buffer.from([1, 2, 3, 4]);
    expect(isBuffer(buffer)).toBe(true);  // Jos arvo on Buffer, tulos on true
  });

  // Testi, jossa tarkistetaan Uint8Array, joka ei ole Buffer
  it('should return false for a Uint8Array', () => {
    const uint8Array = new Uint8Array([1, 2, 3, 4]);
    expect(isBuffer(uint8Array)).toBe(false);  // Uint8Array ei ole Buffer, joten tulos on false
  });

  // Testi, jossa tarkistetaan tavallinen objekti
  it('should return false for a plain object', () => {
    const obj = { a: 1, b: 2 };
    expect(isBuffer(obj)).toBe(false);  // Objekti ei ole Buffer, joten tulos on false
  });

  // Testi, jossa tarkistetaan taulukko
  it('should return false for an array', () => {
    const arr = [1, 2, 3, 4];
    expect(isBuffer(arr)).toBe(false);  // Taulukko ei ole Buffer, joten tulos on false
  });

  // Testi, jossa tarkistetaan null
  it('should return false for null', () => {
    expect(isBuffer(null)).toBe(false);  // Null ei ole Buffer, joten tulos on false
  });

  // Testi, jossa tarkistetaan undefined
  it('should return false for undefined', () => {
    expect(isBuffer(undefined)).toBe(false);  // Undefined ei ole Buffer, joten tulos on false
  });

  // Testi, jossa tarkistetaan string
  it('should return false for a string', () => {
    const str = 'hello';
    expect(isBuffer(str)).toBe(false);  // Merkkijono ei ole Buffer, joten tulos on false
  });

  // Testi, jossa tarkistetaan Buffer-olio, mutta ilman Bufferin tukea
  it('should return false when Buffer is not available', () => {
    const originalBuffer = Buffer;
    global.Buffer = undefined;  // Poistetaan Buffer käytöstä

    const result = isBuffer(new Uint8Array(2));  // Kokeillaan Uint8Array ilman Bufferia
    expect(result).toBe(false);

    global.Buffer = originalBuffer;  // Palautetaan alkuperäinen Buffer takaisin
  });

  it('should return false if moduleExports is false', () => {
    jest.mock('./.internal/root.js', () => ({
      Buffer: undefined, // Simuloidaan ympäristö ilman Bufferia
    }), { virtual: true });
  
    const isBuffer = require('../src/isBuffer').default; // Ladataan uudelleen
    expect(isBuffer(new Uint8Array(2))).toBe(false); // Uint8Array ei ole Buffer, joten tulos on false
  });

  it('should handle case where Buffer is undefined', () => {
    const originalBuffer = global.Buffer;
    global.Buffer = undefined;
  
    const isBuffer = require('../src/isBuffer').default; // Lataa funktio uudelleen
    expect(isBuffer(new Uint8Array(2))).toBe(false); // Uint8Array ei ole Buffer
  
    global.Buffer = originalBuffer; // Palauta alkuperäinen Buffer
  });

  it('should handle case where nativeIsBuffer is undefined', () => {
    const originalBuffer = global.Buffer;
    global.Buffer = { isBuffer: undefined }; // Poistetaan isBuffer-tuki
  
    const isBuffer = require('../src/isBuffer').default; // Lataa funktio uudelleen
    expect(isBuffer(new Uint8Array(2))).toBe(false); // Uint8Array ei ole Buffer
  
    global.Buffer = originalBuffer; // Palauta alkuperäinen Buffer
  });
});
