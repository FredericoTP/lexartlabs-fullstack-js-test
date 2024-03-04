/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      'accounts',
      [{
        id: 1,
        name: 'Ichigo Kurosaki',
        email: 'ichigo@email.com',
        password: 'abc123',
      }, {
        id: 2,
        name: 'Naruto Uzumaki',
        email: 'naruto@email.com',
        password: '123abc',
      }],
      { timestamps: false },
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('accounts', null, {});
  },
};
