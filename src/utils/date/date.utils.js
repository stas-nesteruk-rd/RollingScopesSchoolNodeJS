const dateToString = (date = new Date()) => {
  return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
};

module.exports = dateToString;
