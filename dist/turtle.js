(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = turtle;
// Get all of the images that are marked up to lazy load
var images = document.querySelectorAll('.turtle');
var config = {
  // If the image gets within 50px of the Y axis, start the download
  rootMargin: '50px 0px',
  threshold: 0
};

function turtle() {
  // Counts all the images found that were marked
  var imageCount = images.length;
  var observer = void 0;

  // If we don't have support for intersection observer, loads the images immediately
  if (!('IntersectionObserver' in window)) {
    loadImagesImmediately(images);
  } else {
    // If it is supported, load the images
    observer = new IntersectionObserver(onIntersection, config);

    // foreach() is not supported in IE < 11
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

  function loadImagesImmediately(images) {
    // foreach() is not supported in IE < 11
    images.forEach(function (image) {
      preloadImage(image);
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
}

turtle();
module.exports = exports['default'];
},{}]},{},[1])