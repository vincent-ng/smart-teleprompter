import { findMatchingRanges } from './utils/characterMatching.js';
import { findWordMatchingRanges } from './utils/wordMatching.js';
import { applyHighlights } from './utils/textHighlighting.js';
import { MatchingStrategy } from './utils/matchingStrategy.js';

export function setupTextHighlighter() {
  const textDisplay = document.getElementById('text-display');
  let lastRecognizedText = '';
  let currentStrategy = MatchingStrategy.CHARACTER;
  
  // Create strategy toggle
  const strategyToggle = document.createElement('select');
  strategyToggle.className = 'strategy-toggle';
  strategyToggle.innerHTML = `
    <option value="${MatchingStrategy.CHARACTER}">Character Matching</option>
    <option value="${MatchingStrategy.WORD}">Word Matching</option>
  `;
  
  // Insert toggle before the start button
  const buttons = document.querySelector('.buttons');
  buttons.insertBefore(strategyToggle, buttons.firstChild);
  
  strategyToggle.addEventListener('change', (e) => {
    currentStrategy = e.target.value;
    // Re-highlight with new strategy if there's existing text
    if (lastRecognizedText) {
      highlightSpokenText(lastRecognizedText);
    }
  });

  function highlightSpokenText(transcript) {
    const inputText = document.getElementById('input-text').value;
    
    // Only process new text
    if (transcript === lastRecognizedText) return;
    lastRecognizedText = transcript;

    // Find matches using selected strategy
    const matchRanges = currentStrategy === MatchingStrategy.CHARACTER
      ? findMatchingRanges(inputText, transcript)
      : findWordMatchingRanges(inputText, transcript);

    const highlightedText = applyHighlights(inputText, matchRanges);
    textDisplay.innerHTML = highlightedText;
  }
  
  function reset() {
    lastRecognizedText = '';
    textDisplay.innerHTML = '';
  }
  
  return { 
    highlightSpokenText,
    reset 
  };
}