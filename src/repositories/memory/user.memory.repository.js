/* eslint-disable */
const bcrypt = require('bcrypt');
const users = [
  {
    id: '40949b50-882b-44c1-9f57-25aef52019f5 ',
    name: 'Test user',
    login: 'admin',
    password: '$2b$08$d1xsnlqAdDmN9H0qwDjE4e8qxQ7iZblQMtDe2X.t9u7.QOWIArE7i'
  },
  {
    id: '54caa3f4-6f83-4f5f-b89d-bed3d7d4c5ad',
    name: 'Max Chadway',
    login: 'max',
    password: '$2b$08$zpJwGTSkSrq5XigjJXxto.cEsKlWumgVtjn8luIa9aqtftruNO5ES'
  },
  {
    id: '5e768ccb-6a32-41d3-832d-9f02bf49d6c4',
    name: 'Alex Rose',
    login: 'alex',
    password: '$2b$08$An5SzEUu0tfhsXVOoSh8juQD4YgJ3W/iCdy/.snTA0U8VBg3IFTTe'
  },
  {
    id: 'bdcc999d-8bb8-4d0d-b449-0eebf04bcade',
    name: 'Sara Devil',
    login: 'sara',
    password: '$2b$08$IQ.dKvJXcG8bXB2ZVMi/BOh5lBOz0cdWKa9U8WVGNSVxKE8EfAusu'
  },
  {
    id: 'c4540d17-b7f5-4d8c-a381-e1d1fb699e7a',
    name: 'Sam Wachowski',
    login: 'sam',
    password: '$2b$08$vHW/F3wQsLDHy3mNvZ7ZyOEp1bt97t.13OKoLnN.j290p2MDBVrpK'
  },
  {
    id: '4981c627-dc0d-45a8-ac8f-c429d98ea785',
    name: 'Anna',
    login: 'anna',
    password: '$2b$08$BXOR2wDtbEShDyD6pCyXIO7y8zTSmBGfOBMpfcPVzMAppYtT9XNzm'
  }
];

exports.getUserByCredentials = login =>
  users.find(user => user.login === login);

exports.getAll = async () => users;

exports.getById = async id => users.find(user => user.id === id);

exports.save = async user => {
  user.password = await bcrypt.hash(user.password, 8);
  users.push(user);
  return users[users.length - 1];
};

exports.update = async updatedUser => {
  const index = users.findIndex(user => user.id === updatedUser.id);
  users.splice(index, 1, updatedUser);
  return users[index];
};

exports.delete = async id => {
  const user = await this.getById(id);
  const index = users.indexOf(user);
  users.splice(index, 1);
  return user;
};
