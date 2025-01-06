import { setupSpeechRecognition } from './speechRecognition.js';
import { setupScroller } from './scroller.js';
import { setupUI } from './ui.js';
import { setupAudioVisualizer } from './audioVisualizer.js';
import { setupLanguageSelector } from './languageSelector.js';

document.addEventListener('DOMContentLoaded', () => {
  const { startRecognition, stopRecognition, setLanguage } = setupSpeechRecognition();
  const { startScrolling, stopScrolling } = setupScroller();
  const audioVisualizer = setupAudioVisualizer();
  const languageSelector = setupLanguageSelector();
  
  languageSelector.addEventListener('change', (e) => {
    setLanguage(e.target.value);
  });
  
  setupUI({
    onStart: () => {
      startRecognition();
      startScrolling();
      audioVisualizer.start();
    },
    onStop: () => {
      stopRecognition();
      stopScrolling();
      audioVisualizer.stop();
    }
  });
});