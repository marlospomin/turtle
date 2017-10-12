// Turtle tests
describe('turtle', function () {
  describe('intersection observer', function () {
    it('should be supported', function () {
      assert('IntersectionObserver' in window);
    });

    it('should be an object', function () {
      assert(typeof observer === 'object');
    });

    it('should return a function', function () {
      expect(observer.observe).to.be.a('function');
    });
  });

  // describe('source code', function () {
  //   it('should be a function', function () {
  //     expect(turtle).to.be.a('function');
  //   });
  // });

  // describe('images containing the appropriated class', function () {
  //   before(function () {
  //     document.body.innerHTML = "";
  //     const image = document.createElement('img');
  //     image.classList.add('lazyload');
  //     image.src = "";
  //     image.dataset.src = Math.random().toString(12) + '.jpg';
  //     document.body.appendChild(image);
  //     console.log(image);
  //   })
  //
  //   it('should be loaded', function () {
  //     const image = document.querySelector('img');
  //     assert.ok(image.classList.contains('lazyload--handled'));
  //   });
  // });

  // describe('images not containing the appropriated class', function () {
  //   before(function () {
  //     document.body.innerHTML = "";
  //     const image = document.createElement('img');
  //     image.dataset.src = Math.random().toString(12) + '.jpg';
  //     document.body.appendChild(image);
  //   })
  //
  //   it('should not be loaded', function () {
  //     const image = document.querySelector('img');
  //     assert.notEqual(image.src, image.dataset.src);
  //   });
  // });

  // describe('images containing the appropriated data attribute', function () {
  //   before(function () {
  //     document.body.innerHTML = "";
  //     const image = document.createElement('img');
  //     image.classList.add('lazyload');
  //     image.dataset.src = Math.random().toString(12) + '.jpg';
  //     document.body.appendChild(image);
  //   })
  //
  //   it('should be loaded', function () {
  //     const image = document.querySelector('img');
  //     assert.equal(image.src, image.dataset.src);
  //   });
  // });
});
