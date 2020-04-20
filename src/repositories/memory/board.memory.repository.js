const boards = [
  {
    id: '68433b91-0af5-4bd2-add5-8b503453b2ef',
    title: 'Board1',
    columns: [
      {
        id: 'e9e233b2-d7fc-44ca-a0bd-84814f92f53a',
        title: 'column1:title',
        order: 0
      },
      {
        id: 'a8afaef0-545f-4b0f-ad29-8c57bd4c8241',
        title: 'column1:title',
        order: 0
      }
    ]
  },
  {
    id: 'aea319f4-d162-4818-b6f5-a7342b18626e',
    title: 'Board2',
    columns: [
      {
        id: 'c6591a9a-b3de-4907-acaa-ed5163d5b3f0',
        title: 'column1:title',
        order: 0
      },
      {
        id: 'de5f5f6c-9f57-4707-b570-53167388407b',
        title: 'column1:title',
        order: 0
      }
    ]
  },
  {
    id: 'b343e5fe-94e0-4636-833b-3580fe9d62b5',
    title: 'Board3',
    columns: [
      {
        id: '50dc0359-49e7-41af-a23d-e3faca7ce0ab',
        title: 'column1:title',
        order: 0
      },
      {
        id: '2f32fd35-969c-4336-9cd5-00122e554bd3',
        title: 'column1:title',
        order: 0
      }
    ]
  }
];

exports.getAll = async () => boards;

exports.getById = async id => boards.find(board => board.id === id);

exports.save = async board => {
  boards.push(board);
  return boards[boards.length - 1];
};

exports.update = async updatedBoard => {
  const index = boards.findIndex(board => board.id === updatedBoard.id);
  boards.splice(index, 1, updatedBoard);
  return boards[index];
};

exports.delete = async id => {
  const board = await this.getById(id);
  const index = boards.indexOf(board);
  boards.splice(index, 1);
  return board;
};
