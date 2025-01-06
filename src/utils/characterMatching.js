/**
 * Performs character-by-character matching between script and recognized text
 * @param {string} scriptText Original script text
 * @param {string} recognizedText Speech recognition text
 * @param {number} maxDistance Maximum allowable distance for matching
 * @returns {Array<{start: number, end: number}>} Array of matching ranges
 */
export function findMatchingRanges(scriptText, recognizedText, maxDistance = 10) {
  const matchRanges = [];
  let currentRange = null; // Track the current matching range
  let currentPosition = 0; // Current position in the script text

  // Preprocess scriptText: remove punctuation and track original indices
  const scriptMapping = [];
  const normalizedScript = scriptText.replace(/./g, (char, index) => {
    if (/[^\w\u4e00-\u9fa5]/.test(char)) {
      // Skip punctuation
      return '';
    }
    scriptMapping.push(index); // Track original index
    return char;
  });

  // Preprocess recognizedText: remove punctuation
  const normalizedRecognized = recognizedText.replace(/[^\w\u4e00-\u9fa5]/g, '');

  for (const char of normalizedRecognized) {
    // Find the next occurrence of the character within the allowed distance
    const searchEnd = Math.min(currentPosition + maxDistance, normalizedScript.length);
    const nextPosition = normalizedScript.indexOf(char, currentPosition);

    if (nextPosition !== -1 && nextPosition < searchEnd) {
      // Extend the current range if contiguous
      const originalIndex = scriptMapping[nextPosition];
      if (currentRange && originalIndex === scriptMapping[currentRange.end]) {
        currentRange.end++;
      } else {
        // Start a new range
        if (currentRange) {
          matchRanges.push({
            start: scriptMapping[currentRange.start],
            end: scriptMapping[currentRange.end - 1] + 1
          });
        }
        currentRange = { start: nextPosition, end: nextPosition + 1 };
      }
      currentPosition = nextPosition + 1;
    }
  }

  // Push the last range if it exists
  if (currentRange) {
    matchRanges.push({
      start: scriptMapping[currentRange.start],
      end: scriptMapping[currentRange.end - 1] + 1
    });
  }

  return matchRanges;
}
