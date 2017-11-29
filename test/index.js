// Turtle tests
describe('turtle', () => {
  // "Just to make sure" tests
  describe('intersection observer', () => {
    it('should be supported', () => {
      assert(window.IntersectionObserver);
    });
  });

  describe('source code', () => {
    it('should be a function', () => {
      assert(window.turtle);
    });
  });

  // Actual tests below
});
