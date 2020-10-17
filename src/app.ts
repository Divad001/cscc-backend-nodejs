import express from 'express';
import morgan from 'morgan';
import axios from 'axios';

export const startApp = async (): Promise<void> => {
  // create application
  const app = express();
  // add midleware log
  app.use(morgan('tiny'));
  app.get('/', (_req, res) => {
    res.send('Hello World');
  });
  app.get('/breweries', async (req, res) => {
    let URL = 'https://api.openbrewerydb.org/breweries';
    if (req.query.query !== undefined && req.query.query.length !== 0) {
      URL = `${URL}/search?query=${req.query.query}`;
    }
    try {
      const result = await axios.get(URL);
      res.send(result.data);
    } catch (error) {
      res.send(error.response.status);
    }
  });
  /* app.get('/test', async (_req, res) => {
    const result = await getBreweries();
    res.send(result);
  }); */
  //// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  /* async function getBreweries() {
    try {
      const result = await axios.get('https://api.openbrewerydb.org/breweries');
      return result.data;
    } catch (error) {
      console.log(error);
    }
  } */
  // start application.
  app.listen(8080, () => console.log('Server running'));
};
