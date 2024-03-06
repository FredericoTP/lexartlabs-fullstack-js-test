/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      'accounts',
      [{
        name: 'Ichigo Kurosaki',
        email: 'ichigo@email.com',
        password: '$2a$10$guHnyAr3Lcl8NGb.fa631OLfGlmNFmZpgtCe4FntZnJ69prjnWrp2', // abc123
      }, {
        name: 'Naruto Uzumaki',
        email: 'naruto@email.com',
        password: '$2a$10$2G9Zxm.wXPknRwzjh6u87.wLoozrxZ/SmIcWWwsDAjxYriDRTfVey', // 123abc
      }],
      { timestamps: false },
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('accounts', null, {});
  },
};
