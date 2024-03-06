const express = require('express');
const { LoginRouter, AccountRouter, ProductRouter } = require('./routers');
const HttpError = require('./errors/HttpError');

const app = express();

app.use(express.json());

app.use('/login', LoginRouter);

app.use('/account', AccountRouter);

app.use('/product', ProductRouter);

app.get('/health', (_req, res) => res.status(200).send('Server on and healthy!'));

app.use((err, req, res, _next) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({ message: 'internal server error' });
});

module.exports = app;
