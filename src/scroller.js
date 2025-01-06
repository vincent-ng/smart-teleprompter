export function setupScroller() {
  let scrollInterval = null;
  const textDisplay = document.getElementById('text-display');
  const speedControl = document.getElementById('speed');

  function getScrollSpeed() {
    return (11 - speedControl.value) * 20; // Inverse the speed value for intuitive control
  }

  function scroll() {
    textDisplay.scrollTop += 1;
  }

  return {
    startScrolling: () => {
      const text = document.getElementById('input-text').value;
      textDisplay.innerHTML = text;
      textDisplay.scrollTop = 0;
      
      scrollInterval = setInterval(scroll, getScrollSpeed());

      speedControl.addEventListener('input', () => {
        clearInterval(scrollInterval);
        scrollInterval = setInterval(scroll, getScrollSpeed());
      });
    },
    stopScrolling: () => {
      clearInterval(scrollInterval);
    }
  };
}