const users = [
  {
    id: '54caa3f4-6f83-4f5f-b89d-bed3d7d4c5ad',
    name: 'Max Chadway',
    login: 'max',
    password: 'maxpass'
  },
  {
    id: '5e768ccb-6a32-41d3-832d-9f02bf49d6c4',
    name: 'Alex Rose',
    login: 'alex',
    password: 'alexpass'
  },
  {
    id: 'bdcc999d-8bb8-4d0d-b449-0eebf04bcade',
    name: 'Sara Devil',
    login: 'sara',
    password: 'sarapass'
  },
  {
    id: 'c4540d17-b7f5-4d8c-a381-e1d1fb699e7a',
    name: 'Sam Wachowski',
    login: 'sam',
    password: 'sampass'
  },
  {
    id: '4981c627-dc0d-45a8-ac8f-c429d98ea785',
    name: 'Anna',
    login: 'anna',
    password: 'annapass'
  }
];

exports.getAll = async () => users;

exports.getById = async id => users.find(user => user.id === id);

exports.save = async user => users.push(user);

exports.update = async updatedUser => {
  const index = users.findIndex(user => user.id === updatedUser.id);
  users.splice(index, 1, updatedUser);
};

exports.delete = async id => {
  const user = await this.getById(id);
  const index = users.indexOf(user);
  users.splice(index, 1);
};
