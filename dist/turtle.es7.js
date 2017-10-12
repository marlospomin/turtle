// Actual plugin below
// Get all of the images that are marked up to lazy load
const images = document.querySelectorAll('.turtle');
const config = {
  // If the image gets within 50px in the Y axis, start the download.
  rootMargin: '50px 0px',
  threshold: 0
};

// Counts all the images found that were marked
let imageCount = images.length;
let observer;

// If we don't have support for intersection observer, loads the images immediately
if (!('IntersectionObserver' in window)) {
  loadImagesImmediately(images);
} else {
  // If supported, load the images
  observer = new IntersectionObserver(onIntersection, config);

  // foreach() is not supported in IE < 11
  for (let i = 0; i < images.length; i++) {
    let image = images[i];
    if (image.classList.contains('turtle--handled')) {
      continue;
    }

    // Observes the image
    observer.observe(image);
  }
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

  return fetchImage(src).then(() => { applyImage(image, src); });
}

function loadImagesImmediately(images) {
  // foreach() is not supported in IE < 11
  for (let i = 0; i < images.length; i++) {
    let image = images[i];
    preloadImage(image);
  }
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

  // Loop through the entries
  for (let i = 0; i < entries.length; i++) {
    let entry = entries[i];
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
  img.classList.add('turle--handled');
  // Update image src value
  img.src = src;
  // Add fade-in effect handled by the user
  img.classList.add('fade-in');
}
