function formatReadingTime(minutes) {
  const cups = Math.round(minutes / 5);
  // let bowls = 0;
  if (cups > 5) {
    return `${new Array(Math.round(cups / Math.E)).fill('🍱').join('')} ${minutes} min read`;
  }
  return `${new Array(cups || 1).fill('☕️').join('')} ${minutes} min read`;
}

// `lang` is optional and will default to the current user agent locale
function formatPostDate(date, lang) {
  if (typeof Date.prototype.toLocaleDateString !== 'function') {
    return date;
  }

  date = new Date(date);
  const args = [lang, { day: 'numeric', month: 'long', year: 'numeric' }].filter(Boolean);
  return date.toLocaleDateString(...args);
}

function haveSameItem(arr1 = [], arr2 = []) {
  if (arr1 == null || arr2 == null) {
    // false for no tags
    return false;
  }
  const s = new Set([...arr1, ...arr2]);
  const uniques = [...s];

  return uniques.length < arr1.length + arr2.length;
}

module.exports = {
  formatReadingTime,
  formatPostDate,
  haveSameItem,
};
