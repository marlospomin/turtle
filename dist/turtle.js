'use strict';

// Actual plugin below
// Get all of the images that are marked up to lazy load
var images = document.querySelectorAll('.lazyload');
var config = {
  // If the image gets within 50px in the Y axis, start the download.
  rootMargin: '50px 0px',
  threshold: 0.01
};

var imageCount = images.length;
var observer = void 0;

// If we don't have support for intersection observer, loads the images immediately
if (!('IntersectionObserver' in window)) {
  loadImagesImmediately(images);
} else {
  // It is supported, load the images
  observer = new IntersectionObserver(onIntersection, config);

  // foreach() is not supported in IE
  for (var i = 0; i < images.length; i++) {
    var image = images[i];
    if (image.classList.contains('lazyload--handled')) {
      continue;
    }

    observer.observe(image);
  }
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

  if (!src) {
    return;
  }

  return fetchImage(src).then(function () {
    applyImage(image, src);
  });
}

function loadImagesImmediately(images) {
  // foreach() is not supported in IE
  for (var _i = 0; _i < images.length; _i++) {
    var _image = images[_i];
    preloadImage(_image);
  }
}

function disconnect() {
  if (!observer) {
    return;
  }

  observer.disconnect();
}

function onIntersection(entries) {
  // Disconnect if we've already loaded all of the images
  if (imageCount === 0) {
    observer.disconnect();
  }

  // Loop through the entries
  for (var _i2 = 0; _i2 < entries.length; _i2++) {
    var entry = entries[_i2];
    // Are we in viewport?
    if (entry.intersectionRatio > 0) {
      imageCount--;

      // Stop watching and load the image
      observer.unobserve(entry.target);
      preloadImage(entry.target);
    }
  }
}

function applyImage(img, src) {
  // Prevent this from being lazy loaded a second time.
  img.classList.add('lazyload--handled');
  img.src = src;
  // Add fade-in effect handled by the user
  img.classList.add('fade-in');
}