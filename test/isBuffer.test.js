import isBuffer from '../src/isBuffer';  
import root from '../src/.internal/root';

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

  // Testi: Buffer-globaali ei käytössä 2
  it('should return false when Buffer is not available 2', () => {
    const originalBuffer = global.Buffer; // Tallenna alkuperäinen Buffer
    global.Buffer = undefined; // Poista Buffer käytöstä

    const uint8Array = new Uint8Array([1, 2, 3, 4]);
    expect(isBuffer(uint8Array)).toBe(false);

    global.Buffer = originalBuffer; // Palauta alkuperäinen Buffer
  });


  it('should return false if moduleExports is false', () => {
    jest.mock('./.internal/root.js', () => ({
      Buffer: undefined, // Simuloidaan ympäristö ilman Bufferia
    }), { virtual: true });
  
    const isBuffer = require('../src/isBuffer').default; // Ladataan uudelleen
    expect(isBuffer(new Uint8Array(2))).toBe(false); // Uint8Array ei ole Buffer, joten tulos on false
  });

  // Testi: nativeIsBuffer fallback
  it('should correctly use nativeIsBuffer if available', () => {
    const originalNativeIsBuffer = Buffer.isBuffer;
    Buffer.isBuffer = jest.fn(() => true); // Mockaa isBuffer

    const buffer = Buffer.from([1, 2, 3, 4]);
    expect(isBuffer(buffer)).toBe(true);

    Buffer.isBuffer = originalNativeIsBuffer; // Palauta alkuperäinen isBuffer
  });

  // Testi: nativeIsBuffer fallback palauttaa false
  it('should return false when nativeIsBuffer returns false', () => {
    const originalNativeIsBuffer = Buffer.isBuffer;
    Buffer.isBuffer = jest.fn(() => false); // Mockaa isBuffer palauttamaan false

    const uint8Array = new Uint8Array([1, 2, 3, 4]);
    expect(isBuffer(uint8Array)).toBe(false);

    Buffer.isBuffer = originalNativeIsBuffer; // Palauta alkuperäinen isBuffer
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

describe('isBuffer function extended cases', () => {
  // Tapaus: moduleExports on määritelty, mutta root.Buffer puuttuu
  it('should handle the case when moduleExports is defined but root.Buffer is undefined', () => {
    const originalRootBuffer = root.Buffer;
    root.Buffer = undefined; // Poistetaan Buffer käytöstä rootista

    const result = isBuffer(new Uint8Array([1, 2, 3, 4]));
    expect(result).toBe(false);

    root.Buffer = originalRootBuffer; // Palautetaan alkuperäinen root.Buffer
  });

  // Tapaus: moduleExports ja root.Buffer eivät ole käytettävissä
  it('should return false if both moduleExports and root.Buffer are undefined', () => {
    const originalModuleExports = global.exports;
    const originalRootBuffer = root.Buffer;

    global.exports = undefined;
    root.Buffer = undefined;

    const result = isBuffer(new Uint8Array([1, 2, 3, 4]));
    expect(result).toBe(false);

    global.exports = originalModuleExports;
    root.Buffer = originalRootBuffer;
  });

  // Tapaus: nativeIsBuffer fallback toimii oikein
  it('should call nativeIsBuffer when available and return the result', () => {
    const buffer = Buffer.from([1, 2, 3, 4]);

    const mockNativeIsBuffer = jest.fn().mockReturnValue(true);
    const originalBuffer = global.Buffer;

    global.Buffer = { isBuffer: mockNativeIsBuffer };

    expect(isBuffer(buffer)).toBe(true);
    expect(mockNativeIsBuffer).toHaveBeenCalledWith(buffer);

    global.Buffer = originalBuffer; // Palautetaan alkuperäinen Buffer
  });
});