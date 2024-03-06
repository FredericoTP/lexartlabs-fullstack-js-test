const emptyLogin = {
  email: '',
  password: '',
};

const infoLogin = {
  email: 'test@test.com',
  password: '123456',
};

const infoAccount = {
  dataValues: {
    id: 1,
    name: 'Ichigo Kurosaki',
    email: 'ichigo@email.com',
    password: '123456',
  },
};

const responseLogin = {
  token: 'fakeToken',
};

module.exports = {
  emptyLogin,
  infoLogin,
  infoAccount,
  responseLogin,
};
