// Get all of the images that are marked up to lazy load
const images = document.querySelectorAll('.turtle');
const config = {
  // If the image gets within 50px of the Y axis, start the download
  rootMargin: '50px 0px',
  threshold: 0
};

export default function () {
  // Counts all the images found that were marked
  let imageCount = images.length;
  let observer;

  // If we don't have support for intersection observer, loads the images immediately
  // Else, initialize turtle and observe the marked images
  if (!('IntersectionObserver' in window)) {
    loadImagesImmediately(images);
  } else {
    observe(images);
  }

  function observe(images) {
    observer = new IntersectionObserver(onIntersection, config);

    // foreach() is not supported in IE < 11
    images.forEach((image) => {
      // If the image has been handled, skip to the next image
      if (image.classList.contains('turtle--handled')) {
        return;
      }

      // Observes the image
      observer.observe(image);
    });
  }

  function fetchImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = url;
      image.onload = resolve;
      image.onerror = reject;
    });
  }

  function preloadImage(image) {
    const src = image.dataset.src;

    // If src is not found break
    if (!src) {
      return;
    }

    // Fetches an image and applies it to the viewport
    return fetchImage(src).then(() => { applyImage(image, src); });
  }

  function loadImagesImmediately(images) {
    // foreach() is not supported in IE < 11
    images.forEach((image) => {
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
    entries.forEach((entry) => {
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
