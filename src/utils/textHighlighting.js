/**
 * Applies highlighting to text based on matching ranges
 * @param {string} text Original text
 * @param {Array<{start: number, end: number}>} ranges Matching ranges
 * @returns {string} HTML string with highlights
 */
export function applyHighlights(text, ranges) {
  let result = '';
  let lastIndex = 0;

  ranges.forEach(({ start, end }) => {
    result += text.slice(lastIndex, start);
    result += `<span class="highlighted">${text.slice(start, end)}</span>`;
    lastIndex = end;
  });

  result += text.slice(lastIndex);
  return result;
}