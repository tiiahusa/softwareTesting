// mathOperations.js

/**
 * Lisää kaksi lukua.
 * @param {number} a Ensimmäinen luku.
 * @param {number} b Toinen luku.
 * @returns {number} Palauttaa summan.
 */
export function add(a, b) {
    return a + b;
  }
  
  /**
   * Vähentää toisen luvun ensimmäisestä.
   * @param {number} a Ensimmäinen luku.
   * @param {number} b Toinen luku.
   * @returns {number} Palauttaa erotuksen.
   */
  export function subtract(a, b) {
    return a - b;
  }
  
  /**
   * Kertoo kaksi lukua.
   * @param {number} a Ensimmäinen luku.
   * @param {number} b Toinen luku.
   * @returns {number} Palauttaa tulon.
   */
  export function multiply(a, b) {
    return a * b;
  }
  
  /**
   * Jakaa ensimmäisen luvun toisella.
   * @param {number} a Ensimmäinen luku.
   * @param {number} b Toinen luku.
   * @returns {number} Palauttaa osamäärän.
   */
  export function divide(a, b) {
    if (b === 0) {
      throw new Error('Cannot divide by zero');
    }
    return a / b;
  }
  