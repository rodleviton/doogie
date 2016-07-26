const easeInOutCubic = function (t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
}

var position = function(start, end, elapsed, duration) {
  if (elapsed > duration) {
    return end
  }

  return start + (end - start) * easeInOutCubic(elapsed / duration)
}

const smoothScroll = function (element, start, end, duration) {

  let clock = Date.now();
  const requestAnimationFrame = window.requestAnimationFrame;

  const step = function () {
    let elapsed = Date.now() - clock
    element.scrollTop = position(start, end, elapsed, duration);

    if (elapsed < duration) {
      requestAnimationFrame(step)
    }
  }

  step()
}

module.exports = smoothScroll
