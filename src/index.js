const defaultConfig = {
  // If the image gets within 50px of the Y axis, start the download
  rootMargin: '50px'
};

// If we don't have support for intersection observer, throw error
if (!('IntersectionObserver' in window)) {
  throw new Error('Intersection Observer is not supported by this browser.');
}

export default function (selector = '.turtle', config = {}) {
  // Push default config options into config above
  const { rootMargin } = { ...defaultConfig, ...config };
  // Get all of the images that are marked up to lazy load
  const images = document.querySelectorAll(selector);
  // Create the observer
  let observer;

  function observe(images) {
    // Create the observer instance
    observer = new IntersectionObserver(onIntersection, config);

    Array.from(images).forEach((image) => {
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
    return new Promise((resolve, reject) => {
      // Create a new image
      const image = new Image();
      // Set this image to the paramenter url
      image.src = url;
      // Handles errors
      image.onload = resolve;
      image.onerror = reject;
    });
  }

  function preloadImage(image) {
    // Load src from the dataset
    const src = image.dataset.src;

    // If src is not found break
    if (!src) {
      return;
    }

    // Fetches an image and applies it to the viewport
    return fetchImage(src).then(() => { applyImage(image, src); });
  }

  function onIntersection(entries) {
    // Loop through image entries
    Array.from(entries).forEach((entry) => {
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
}
