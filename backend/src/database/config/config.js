const env = process.env.NODE_ENV || 'development';

const sequelizeConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: `${process.env.DB_NAME}-${env}`,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //   },
  // },
};

module.exports = {
  [env]: sequelizeConfig,
};
