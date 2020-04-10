const fs = require('fs');

const checkFolder = path => {
  // eslint-disable-next-line no-sync
  if (!fs.existsSync(path)) {
    // eslint-disable-next-line no-sync
    fs.mkdirSync(path);
  }
};

module.exports = {
  checkFolder
};
