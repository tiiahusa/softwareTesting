// test/math-test.js
const { add, multiply } = require('../math.js');

(async () => {
  const { expect } = await import('chai');
  
  describe('Math functions', function() {
    it('should add two numbers correctly', function() {
      expect(add(2, 3)).to.equal(5);
    });

    it('should multiply two numbers correctly', function() {
      expect(multiply(2, 3)).to.equal(6);
    });

    it('should return 0 when multiplying by 0', function() {
      expect(multiply(5, 0)).to.equal(0);
    });
  });
})();
