module.exports = (sequelize, Datatypes) => {
  const Account = sequelize.define(
    'Account',
    {
      id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      email: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      password: {
        type: Datatypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'accounts',
    },
  );

  Account.associate = (models) => {
    Account.hasMany(
      models.Product,
      {
        foreignKey: 'accountId',
        as: 'products',
      },
    );
  };

  return Account;
};
