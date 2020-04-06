// - Board (set of columns):
//   ```javascript
//   { id, title, columns }
//   ```
// - Column (set of tasks):
//   ```javascript
//    { id, title, order }

const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title = 'title', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

class Board {
  constructor({ id = uuid(), title = 'title', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = {
  Board,
  Column
};
