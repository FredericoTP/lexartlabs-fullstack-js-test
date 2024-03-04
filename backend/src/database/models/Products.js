module.exports = (sequelize, Datatypes) => {
  const Product = sequelize.define(
    'Product',
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
      brand: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      model: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      price: {
        type: Datatypes.INTEGER,
        allowNull: false,
      },
      color: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      accountId: {
        type: Datatypes.INTEGER,
        foreignKey: true,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'products',
    },
  );

  Product.associate = (models) => {
    Product.belongsTo(
      models.Account,
      {
        foreignKey: 'accountId',
        as: 'account',
      },
    );
  };

  return Product;
};
