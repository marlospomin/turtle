const defaultConfig = {
  // If the window gets within 50px of the image, trigger the download
  rootMargin: '50px',
}

export default function(selector = '.turtle', config = {}) {
  // Push default config options into the function
  config = { ...defaultConfig, ...config }
  // Get all of the images that are marked up to lazy load
  const images = document.querySelectorAll(selector)
  // Create the observer
  let observer

  const observe = (entries) => {
    // Create the observer instance
    observer = new IntersectionObserver(onIntersection, config)

    Array.from(entries).forEach((entry) => {
      // If the image has been handled, skip to the next image
      if (entry.classList.contains('turtle--handled')) return
      // Observes the image
      observer.observe(entry)
    })
  }

  const preloadImage = (image) => {
    // Load src from the dataset
    const src = image.dataset.src
    // If src is not found break
    if (!src) return
    // Applies an image to the viewport
    return applyImage(image, src)
  }

  const onIntersection = (entries) => {
    // Loop through image entries
    Array.from(entries).forEach((entry) => {
      // If the image is in the viewport unobserve it
      if (entry.intersectionRatio > 0) {
        // Stop watching and load the image
        observer.unobserve(entry.target)
        preloadImage(entry.target)
      }
    })
  }

  const applyImage = (img, src) => {
    // Prevent this from being lazy loaded a second time
    img.classList.add('turle--handled')
    // Update image src value
    img.src = src
  }

  return observe(images)
}
