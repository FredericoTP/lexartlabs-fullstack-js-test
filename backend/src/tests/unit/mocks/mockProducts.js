const allProducts = [
  {
    id: 1,
    name: 'Notebook Acer',
    brand: 'Acer',
    model: 'Nitro 5',
    price: 3500,
    color: 'black',
    account_id: 1,
  },
  {
    id: 2,
    name: 'Mouse Logitech',
    brand: 'Logitech',
    model: 'A400',
    price: 500,
    color: 'white',
    account_id: 2,
  },
];

const oneProduct = {
  id: 1,
  name: 'Notebook Acer',
  brand: 'Acer',
  model: 'Nitro 5',
  price: 3500,
  color: 'black',
  accountId: 1,
};

const accountProducts = [
  {
    id: 1,
    name: 'Notebook Acer',
    brand: 'Acer',
    model: 'Nitro 5',
    price: 3500,
    color: 'black',
    account_id: 1,
  },
  {
    id: 2,
    name: 'Mouse Logitech',
    brand: 'Logitech',
    model: 'A400',
    price: 500,
    color: 'white',
    account_id: 1,
  },
];

const emptyProduct = {
  name: '',
  brand: '',
  model: '',
  price: 3500,
  color: '',
  accountId: 1,
};

const infoToken = {
  id: 1,
  name: 'Ichigo Kurosaki',
  email: 'ichigo@email.com',
};

const createOne = {
  name: 'Xiaomi Redmi 9',
  brand: 'Xiaomi',
  model: 'Redmi 9',
  price: 10000,
  color: 'red',
};

const createTwo = {
  name: 'Xiaomi Redmi 9',
  details: {
    brand: 'Xiaomi',
    model: 'Redmi 9',
    color: 'red',
  },
  price: 10000,
};

const createThree = [
  {
    name: 'Xiaomi Redmi 9',
    brand: 'Xiaomi',
    model: 'Redmi 9',
    data: [
      {
        price: 10000,
        color: 'red',
      },
      {
        price: 10000,
        color: 'blue',
      },
    ],
  },
  {
    name: 'Iphone 14 Pro',
    brand: 'Iphone',
    model: '14 Pro',
    data: [
      {
        price: 30000,
        color: 'silver',
      },
      {
        price: 30100,
        color: 'gold',
      },
    ],
  },
];

const createdProduct = {
  id: 1,
  name: 'Xiaomi Redmi 9',
  brand: 'Xiaomi',
  model: 'Redmi 9',
  price: 10000,
  color: 'red',
  accountId: 1,
};

const createdProducts = [
  {
    id: 1,
    name: 'Xiaomi Redmi 9',
    brand: 'Xiaomi',
    model: 'Redmi 9',
    price: 10000,
    color: 'red',
    accountId: 1,
  }, {
    id: 2,
    name: 'Xiaomi Redmi 9',
    brand: 'Xiaomi',
    model: 'Redmi 9',
    price: 10000,
    color: 'blue',
    accountId: 1,
  }, {
    id: 3,
    name: 'Iphone 14 Pro',
    brand: 'Iphone',
    model: '14 Pro',
    price: 30000,
    color: 'silver',
    accountId: 1,
  }, {
    id: 4,
    name: 'Iphone 14 Pro',
    brand: 'Iphone',
    model: '14 Pro',
    price: 30100,
    color: 'gold',
    accountId: 1,
  },
];

module.exports = {
  allProducts,
  oneProduct,
  accountProducts,
  emptyProduct,
  infoToken,
  createOne,
  createTwo,
  createThree,
  createdProduct,
  createdProducts,
};
