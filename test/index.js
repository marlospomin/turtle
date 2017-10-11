// Turtle tests
describe('turtle', function () {
  describe('intersection observer', function () {
    it('should be loaded', function () {
      assert('IntersectionObserver' in window);
    });
  });

  describe('images containing the appropriated class', function () {
    before(function () {
      const image = document.createElement('img');
      image.dataset.src = 'turtle-example.jpg';
      image.classList.add('lazyload');
      document.body.appendChild(image);
    })

    it('should be loaded', function () {
      const image = document.querySelector('.lazyload');
      // Content
    });
  });

  describe('images not containing the appropriated class', function () {
    before(function () {
      const image = document.createElement('img');
      image.dataset.src = 'turtle-example.jpg';
      document.body.appendChild(image);
    })

    it('should not be loaded', function () {
      const image = document.querySelector('img');
      // Content
    });
  })
});
