// Turtle tests
describe('turtle', () => {
  // "Just to make sure" tests
  describe('intersection observer', () => {
    it('should be supported', () => {
      assert(window.IntersectionObserver);
    });
  });

  // Actual tests
  describe('source code', () => {
    it('should be a function', () => {
      assert(window.turtle);
    });
  });

  describe('images containing the appropriated class', () => {
    before(() => {})

    it('should be loaded', () => {});
  });

  describe('images not containing the appropriated class', () => {
    before(() => {})

    it('should not be loaded', () => {

    });
  });

  describe('images containing the appropriated data attribute', () => {
    before(() => {})

    it('should be loaded', () => {

    });
  });
});
