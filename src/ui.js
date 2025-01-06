import { setupTextHighlighter } from './textHighlighter.js';

export function setupUI({ onStart, onStop }) {
  const startBtn = document.getElementById('start-btn');
  const stopBtn = document.getElementById('stop-btn');
  const inputText = document.getElementById('input-text');
  const { highlightSpokenText, reset } = setupTextHighlighter();

  // Set up speech progress event listener
  window.addEventListener('speech-progress', (e) => {
    highlightSpokenText(e.detail.transcript);
  });

  startBtn.addEventListener('click', () => {
    if (!inputText.value.trim()) {
      alert('Please enter some text first!');
      return;
    }

    reset(); // Reset highlighting state
    startBtn.disabled = true;
    stopBtn.disabled = false;
    inputText.disabled = true;
    onStart();
  });

  stopBtn.addEventListener('click', () => {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    inputText.disabled = false;
    onStop();
  });
}