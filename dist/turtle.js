(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.turtle = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function () {
    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.turtle';
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // Push default config options into config above
    var _defaultConfig$config = _extends({}, defaultConfig, config),
        rootMargin = _defaultConfig$config.rootMargin;
    // Get all of the images that are marked up to lazy load


    var images = document.querySelectorAll(selector);
    // Create the observer
    var observer = void 0;

    function observe(images) {
      // Create the observer instance
      observer = new IntersectionObserver(onIntersection, config);

      Array.from(images).forEach(function (image) {
        // If the image has been handled, skip to the next image
        if (image.classList.contains('turtle--handled')) {
          return;
        }
        // Observes the image
        observer.observe(image);
      });
    }

    function fetchImage(url) {
      // Create a promise to fetch an image
      return new Promise(function (resolve, reject) {
        // Create a new image
        var image = new Image();
        // Set this image to the paramenter url
        image.src = url;
        // Handles errors
        image.onload = resolve;
        image.onerror = reject;
      });
    }

    function preloadImage(image) {
      // Load src from the dataset
      var src = image.dataset.src;

      // If src is not found break
      if (!src) {
        return;
      }

      // Fetches an image and applies it to the viewport
      return fetchImage(src).then(function () {
        applyImage(image, src);
      });
    }

    function onIntersection(entries) {
      // Loop through image entries
      Array.from(entries).forEach(function (entry) {
        // If the image is in the viewport unobserve it
        if (entry.intersectionRatio > 0) {
          // Stop watching and load the image
          observer.unobserve(entry.target);
          preloadImage(entry.target);
        }
      });
    }

    function applyImage(img, src) {
      // Prevent this from being lazy loaded a second time
      img.classList.add('turle--handled');
      // Update image src value
      img.src = src;
    }

    return observe(images);
  };

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var defaultConfig = {
    // If the image gets within 50px of the Y axis, start the download
    rootMargin: '50px'
  };

  // If we don't have support for intersection observer, throw error
  if (!('IntersectionObserver' in window)) {
    throw new Error('Intersection Observer is not supported by this browser.');
  }

  module.exports = exports['default'];
});