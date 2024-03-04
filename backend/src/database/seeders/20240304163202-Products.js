/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      'products',
      [{
        id: 1,
        name: 'Notebook Acer',
        brand: 'Acer',
        model: 'Nitro 5',
        price: 3500,
        color: 'black',
      }, {
        id: 2,
        name: 'Mouse Logitech',
        brand: 'Logitech',
        model: 'A400',
        price: 500,
        color: 'white',
      }],
      { timestamps: false },
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  },
};
