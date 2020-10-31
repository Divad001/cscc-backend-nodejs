import express from 'express';
import morgan from 'morgan';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

export const startApp = async (): Promise<void> => {
  // hard coded user
  type User = {
    email: string;
    password: string;
  };
  const testUser: User = {
    email: 'test@test.test',
    password: 'Testtest',
  };
  // create application
  const app = express();
  // add midleware log
  app.use(morgan('tiny'));
  //cors
  app.use(cors());
  // body-parser
  app.use(express.json());
  // jwt
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const jwt = require('jsonwebtoken');
  dotenv.config();
  // GET /breweries optional param: 'query'
  app.get('/breweries', verifyToken, async (req, res) => {
    try {
      const result = await getBreweries(req);
      res.send(result);
    } catch (error) {
      res.send(error.response.status);
    }
  });
  async function getBreweries(req: express.Request): Promise<void> {
    let URL = 'https://api.openbrewerydb.org/breweries';
    if (req.query.query !== undefined && req.query.query.length !== 0) {
      URL = `${URL}/search?query=${req.query.query}`;
    }
    try {
      const result = await axios.get(URL);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
  // POST /login required body
  app.post('/login', (req, res) => {
    if (Object.keys(req.body).length === 0) {
      res.sendStatus(400);
    } else {
      const reqUser: User = {
        email: req.body.email,
        password: req.body.password,
      };
      if (JSON.stringify(reqUser) === JSON.stringify(testUser)) {
        const user = {
          id: 1,
          reqUser,
        };
        jwt.sign({ user: user }, process.env.SECRET_KEY, { expiresIn: 20 }, (_err: Error, token: string) => {
          res.json({
            token,
          });
        });
      } else {
        res.sendStatus(401);
      }
    }
  });
  // verify jwt function
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function verifyToken(req: any, res: any, next: any) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(' ')[1];
      jwt.verify(bearerToken, process.env.SECRET_KEY, (err: Error, user: User) => {
        if (err) {
          return res.sendStatus(401);
        } else {
          req.user = user;
          next();
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
  // Not found response
  app.use(function(_req, res) {
    res.sendStatus(404);
  });
  // start application.
  app.listen(8080, () => console.log('Server running'));
};
