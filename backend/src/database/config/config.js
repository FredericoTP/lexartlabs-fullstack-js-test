const env = process.env.NODE_ENV;

const sequelizeConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: `${process.env.DB_NAME}-${env}`,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //   },
  // },
};

module.exports = {
  [env]: sequelizeConfig,
};