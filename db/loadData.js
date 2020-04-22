const logger = require('../src/utils/logger/logger.utils');
const { Task, Board, User } = require('../src/models/mongodb');

const users = [
  new User({
    _id: '40949b50-882b-44c1-9f57-25aef52019f5 ',
    name: 'Test user',
    login: 'admin',
    password: 'admin'
  }),
  new User({
    _id: '54caa3f4-6f83-4f5f-b89d-bed3d7d4c5ad',
    name: 'Max Chadway',
    login: 'max',
    password: 'maxpass'
  }),
  new User({
    _id: '5e768ccb-6a32-41d3-832d-9f02bf49d6c4',
    name: 'Alex Rose',
    login: 'alex',
    password: 'alexpass'
  }),
  new User({
    _id: 'bdcc999d-8bb8-4d0d-b449-0eebf04bcade',
    name: 'Sara Devil',
    login: 'sara',
    password: 'sarapass'
  }),
  new User({
    _id: 'c4540d17-b7f5-4d8c-a381-e1d1fb699e7a',
    name: 'Sam Wachowski',
    login: 'sam',
    password: 'sampass'
  }),
  new User({
    _id: '4981c627-dc0d-45a8-ac8f-c429d98ea785',
    name: 'Anna',
    login: 'anna',
    password: 'annapass'
  })
];

const boards = [
  new Board({
    _id: '68433b91-0af5-4bd2-add5-8b503453b2ef',
    title: 'Board1',
    columns: [
      {
        _id: 'e9e233b2-d7fc-44ca-a0bd-84814f92f53a',
        title: 'column1:title',
        order: 0
      },
      {
        _id: 'a8afaef0-545f-4b0f-ad29-8c57bd4c8241',
        title: 'column1:title',
        order: 0
      }
    ]
  }),
  new Board({
    _id: 'aea319f4-d162-4818-b6f5-a7342b18626e',
    title: 'Board2',
    columns: [
      {
        _id: 'c6591a9a-b3de-4907-acaa-ed5163d5b3f0',
        title: 'column1:title',
        order: 0
      },
      {
        _id: 'de5f5f6c-9f57-4707-b570-53167388407b',
        title: 'column1:title',
        order: 0
      }
    ]
  }),
  new Board({
    _id: 'b343e5fe-94e0-4636-833b-3580fe9d62b5',
    title: 'Board3',
    columns: [
      {
        _id: '50dc0359-49e7-41af-a23d-e3faca7ce0ab',
        title: 'column1:title',
        order: 0
      },
      {
        _id: '2f32fd35-969c-4336-9cd5-00122e554bd3',
        title: 'column1:title',
        order: 0
      }
    ]
  })
];

const tasks = [
  new Task({
    _id: '8d0f37de-4649-4b79-8641-0e6af24c4036',
    title: 'Title1',
    order: 0,
    description: 'task1: description',
    userId: '54caa3f4-6f83-4f5f-b89d-bed3d7d4c5ad',
    boardId: '68433b91-0af5-4bd2-add5-8b503453b2ef',
    columnId: 'e9e233b2-d7fc-44ca-a0bd-84814f92f53a'
  }),
  new Task({
    _id: 'a6ebc8dd-e489-4264-843d-20589fab73cf',
    title: 'Title2',
    order: 0,
    description: 'task2: description',
    userId: '54caa3f4-6f83-4f5f-b89d-bed3d7d4c5ad',
    boardId: '68433b91-0af5-4bd2-add5-8b503453b2ef',
    columnId: 'a8afaef0-545f-4b0f-ad29-8c57bd4c8241'
  }),
  new Task({
    _id: '814daeef-91a0-42cd-9f91-e1412dd903f4',
    title: 'Title3',
    order: 0,
    description: 'task3: description',
    userId: '5e768ccb-6a32-41d3-832d-9f02bf49d6c4',
    boardId: 'aea319f4-d162-4818-b6f5-a7342b18626e',
    columnId: 'c6591a9a-b3de-4907-acaa-ed5163d5b3f0'
  }),
  new Task({
    _id: 'fd603019-c9da-4b4a-94cc-8c6a67c5d624',
    title: 'Title4',
    order: 0,
    description: 'task4: description',
    userId: '5e768ccb-6a32-41d3-832d-9f02bf49d6c4',
    boardId: 'aea319f4-d162-4818-b6f5-a7342b18626e',
    columnId: 'c6591a9a-b3de-4907-acaa-ed5163d5b3f0'
  }),
  new Task({
    _id: 'dda6d885-df65-4343-a52a-72add94b006f',
    title: 'Title5',
    order: 0,
    description: 'task5: description',
    userId: 'bdcc999d-8bb8-4d0d-b449-0eebf04bcade',
    boardId: 'b343e5fe-94e0-4636-833b-3580fe9d62b5',
    columnId: '50dc0359-49e7-41af-a23d-e3faca7ce0ab'
  })
];

const createUsers = () => {
  users.forEach(user => user.save());
};

const createBoards = () => {
  boards.forEach(board => board.save());
};

const createTasks = () => {
  tasks.forEach(task => task.save());
};

const dropDataBase = async () => {
  try {
    logger.info('Starting delete data...');
    await Task.deleteMany();
    await Board.deleteMany();
    await User.deleteMany();
    logger.info('Deleting is complete...');
  } catch (error) {
    throw new Error('Drop database is fault.');
  }
};

const setupDataBase = async () => {
  try {
    await dropDataBase();
    logger.info('Starting load data...');
    await createUsers();
    await createBoards();
    await createTasks();
    logger.info('Loading is complete...');
  } catch (error) {
    throw new Error('Load data to database is fault');
  }
};

module.exports = setupDataBase;
