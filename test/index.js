require('jsdom-global')()

const assert = require('assert');
const turtle = require('../src/turtle.js');

describe('turtle', function () {
  describe('intersection observer', function () {
    it('should be loaded', function () {
      // assert('IntersectionObserver' in window);
      assert.equal('function', typeof IntersectionObserver);
    });
  });

  describe('images containing appropriated class', function () {
    beforeEach(function () {
      const image = document.createElement('img');
      image.dataset.src = Math.random().toString(36).substring(7);
      image.classList.add('lazyload');
      document.body.appendChild(image);
    })

    it('should be loaded', function () {
      const image = document.querySelector('.lazyload');
      assert(image.classList.contains('.lazyload--handled'));
    });
  });
});
