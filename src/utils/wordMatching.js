/**
 * Performs word-based matching between script and recognized text
 * @param {string} scriptText Original script text
 * @param {string} recognizedText Speech recognition text
 * @returns {Array<{start: number, end: number}>} Array of matching ranges
 */
export function findWordMatchingRanges(scriptText, recognizedText) {
  let matchRanges = [];
  let scriptIndex = 0;
  let recogIndex = 0;
  let matchStart = -1;

  // Split into words and normalize
  const scriptWords = scriptText.split(/\s+/).filter(Boolean);
  const recognizedWords = recognizedText.split(/\s+/).filter(Boolean);

  let currentScriptPos = 0;
  for (let i = 0; i < scriptWords.length; i++) {
    const word = scriptWords[i];
    if (i < recognizedWords.length && word === recognizedWords[i]) {
      const wordStart = scriptText.indexOf(word, currentScriptPos);
      if (wordStart !== -1) {
        matchRanges.push({
          start: wordStart,
          end: wordStart + word.length
        });
        currentScriptPos = wordStart + word.length;
      }
    }
  }

  return matchRanges;
}