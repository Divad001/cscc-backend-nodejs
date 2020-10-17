import express from 'express';

export const startApp = async (): Promise<void> => {
  // create application
  const app = express();
  // create midleware log
  const morgan = require('morgan');
  app.use(morgan('tiny'));
  app.get('/', (_req, res) => {
    res.send('Hello World')
  });
  // start application.
  app.listen(8080, () => console.log('Server running'))
};
