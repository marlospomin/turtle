// Turtle tests
describe('turtle', function() {
  // "Just to make sure" tests
  describe('intersection observer', () => {
    it('should be supported', () => {
      assert(window.IntersectionObserver);
    });

    it('should return a function', () => {
      expect(observer.observe).to.be.a('function');
    });
  });

  // Actual tests
  describe('source code', () => {
    it('should be a function', () => {
      expect(turtle).to.be.a('function');
    });
  });

  describe('images containing the appropriated class', () => {
    before(() => {})

    it('should be loaded', () => {});
  });

  describe('images not containing the appropriated class', () => {
    before(function() {})

    it('should not be loaded', () => {

    });
  });

  describe('images containing the appropriated data attribute', () => {
    before(() => {})

    it('should be loaded', () => {

    });
  });
});
