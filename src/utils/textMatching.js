// Utility functions for fuzzy text matching

/**
 * Calculate similarity between two strings
 * @param {string} str1 
 * @param {string} str2 
 * @returns {number} Similarity score (0-1)
 */
export function calculateSimilarity(str1, str2) {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix = Array(len2 + 1).fill().map(() => Array(len1 + 1).fill(0));

  for (let i = 0; i <= len1; i++) matrix[0][i] = i;
  for (let j = 0; j <= len2; j++) matrix[j][0] = j;

  for (let j = 1; j <= len2; j++) {
    for (let i = 1; i <= len1; i++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j - 1][i] + 1,
        matrix[j][i - 1] + 1,
        matrix[j - 1][i - 1] + cost
      );
    }
  }

  const maxLen = Math.max(len1, len2);
  return 1 - matrix[len2][len1] / maxLen;
}

/**
 * Find the best matching position in the remaining text
 * @param {string} remainingText Unmatched portion of original text
 * @param {string} newSpokenText New portion of spoken text
 * @param {number} minSimilarity Minimum similarity threshold (0-1)
 * @returns {number} Length of the best matching segment
 */
export function findBestMatch(remainingText, newSpokenText, minSimilarity = 0.7) {
  if (!remainingText || !newSpokenText) return 0;

  const maxSearchLength = Math.min(remainingText.length, newSpokenText.length * 2);
  let bestScore = 0;
  let bestLength = 0;

  for (let len = 1; len <= maxSearchLength; len++) {
    const textSegment = remainingText.slice(0, len);
    const similarity = calculateSimilarity(textSegment, newSpokenText);

    if (similarity > bestScore && similarity >= minSimilarity) {
      bestScore = similarity;
      bestLength = len;
    }
  }

  return bestLength;
}