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
        rootMargin = _defaultConfig$config.rootMargin,
        treshold = _defaultConfig$config.treshold;

    // Get all of the images that are marked up to lazy load


    var images = document.querySelectorAll(selector);

    // Counts all the images found that were marked
    var imageCount = images.length;
    var observer = void 0;

    function observe(images) {
      observer = new IntersectionObserver(onIntersection, config);

      images.forEach(function (image) {
        // If the image has been handled, skip to the next image
        if (image.classList.contains('turtle--handled')) {
          return;
        }

        // Observes the image
        observer.observe(image);
      });
    }

    function fetchImage(url) {
      return new Promise(function (resolve, reject) {
        var image = new Image();
        image.src = url;
        image.onload = resolve;
        image.onerror = reject;
      });
    }

    function preloadImage(image) {
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

    function disconnect() {
      // If not observing break
      if (!observer) {
        return;
      }

      observer.disconnect();
    }

    function onIntersection(entries) {
      // Disconnect if we've already loaded all of the images
      if (imageCount === 0) {
        disconnect();
      }

      // Loop through image entries
      entries.forEach(function (entry) {
        // If the image is in the viewport unobserve it
        if (entry.intersectionRatio > 0) {
          imageCount--;

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
    rootMargin: '50px',
    threshold: 0
  };

  // If we don't have support for intersection observer, throw error
  if (!('IntersectionObserver' in window)) {
    throw new Error('Intersection Observer is not supported by this browser.');
  }

  module.exports = exports['default'];
});