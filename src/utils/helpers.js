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

function getPreviousNextNode(posts, fromInd) {
  let previous;
  let next;
  if (posts.length > 0 && fromInd > -1) {
    previous = fromInd <= 0 ? null : posts[fromInd - 1].node;
    next = fromInd === posts.length - 1 ? null : posts[fromInd + 1].node;
  }

  return {
    previous,
    next,
  };
}

const isAlphabetNum = s =>
  /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g.test(s);

function kebabCase(s) {
  if (isAlphabetNum(s)) {
    return s
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.toLowerCase())
      .join('-');
  }

  return s
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

module.exports = {
  formatReadingTime,
  formatPostDate,
  haveSameItem,
  getPreviousNextNode,
  kebabCase,
};
