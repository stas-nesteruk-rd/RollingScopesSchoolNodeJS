const tasks = [
  {
    id: '8d0f37de-4649-4b79-8641-0e6af24c4036',
    title: 'Title1',
    order: 0,
    description: 'task1: description',
    userId: '54caa3f4-6f83-4f5f-b89d-bed3d7d4c5ad',
    boardId: '68433b91-0af5-4bd2-add5-8b503453b2ef',
    columnId: 'e9e233b2-d7fc-44ca-a0bd-84814f92f53a'
  },
  {
    id: 'a6ebc8dd-e489-4264-843d-20589fab73cf',
    title: 'Title2',
    order: 0,
    description: 'task2: description',
    userId: '54caa3f4-6f83-4f5f-b89d-bed3d7d4c5ad',
    boardId: '68433b91-0af5-4bd2-add5-8b503453b2ef',
    columnId: 'a8afaef0-545f-4b0f-ad29-8c57bd4c8241'
  },
  {
    id: '814daeef-91a0-42cd-9f91-e1412dd903f4',
    title: 'Title3',
    order: 0,
    description: 'task3: description',
    userId: '5e768ccb-6a32-41d3-832d-9f02bf49d6c4',
    boardId: 'aea319f4-d162-4818-b6f5-a7342b18626e',
    columnId: 'c6591a9a-b3de-4907-acaa-ed5163d5b3f0'
  },
  {
    id: 'fd603019-c9da-4b4a-94cc-8c6a67c5d624',
    title: 'Title4',
    order: 0,
    description: 'task4: description',
    userId: '5e768ccb-6a32-41d3-832d-9f02bf49d6c4',
    boardId: 'aea319f4-d162-4818-b6f5-a7342b18626e',
    columnId: 'c6591a9a-b3de-4907-acaa-ed5163d5b3f0'
  },
  {
    id: 'dda6d885-df65-4343-a52a-72add94b006f',
    title: 'Title5',
    order: 0,
    description: 'task5: description',
    userId: 'bdcc999d-8bb8-4d0d-b449-0eebf04bcade',
    boardId: 'b343e5fe-94e0-4636-833b-3580fe9d62b5',
    columnId: '50dc0359-49e7-41af-a23d-e3faca7ce0ab'
  }
];

exports.getAll = async boardId =>
  tasks.filter(task => task.boardId === boardId);

exports.getById = async (boardId, taskId) =>
  tasks.find(task => {
    if (task.id === taskId && task.boardId === boardId) {
      return task;
    }
  });

exports.save = async task => tasks.push(task);

exports.update = async updatedTask => {
  const index = tasks.findIndex(task => task.id === updatedTask.id);
  tasks.splice(index, 1, updatedTask);
};

exports.delete = async (boardId, id) => {
  const task = await this.getById(boardId, id);
  const index = tasks.indexOf(task);
  tasks.splice(index, 1);
};

exports.deleteAllTasksByBoardId = async boardId => {
  const found = tasks.filter(task => task.boardId === boardId);
  found.forEach(task => {
    tasks.splice(task, 1);
  });
};

exports.updateUserIdOnNullbyId = async id => {
  tasks.forEach(task => {
    if (task.userId === id) {
      task.userId = null;
    }
  });
};
