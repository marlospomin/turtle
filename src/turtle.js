const defaultConfig = {
  // If the image gets within 50px of the Y axis, start the download
  rootMargin: '50px',
  threshold: 0
};

// If we don't have support for intersection observer, throw error
if (!('IntersectionObserver' in window)) {
  throw new Error('Intersection Observer is not supported by this browser.');
}

export default function (selector = '.turtle', config = {}) {
  // Push default config options into config above
  const { rootMargin, treshold } = { ...defaultConfig, ...config };

  // Get all of the images that are marked up to lazy load
  const images = document.querySelectorAll(selector);

  // Counts all the images found that were marked
  let imageCount = images.length;
  let observer;

  function observe(images) {
    observer = new IntersectionObserver(onIntersection, config);

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

  return observe(images);
}
