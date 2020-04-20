const titleSort = (first, second) => {
  if (first.title > second.title) return 1;
  if (first.title < second.title) return -1;
  return 0;
};

module.exports = titleSort;
