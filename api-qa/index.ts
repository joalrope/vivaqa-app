import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { dbConnection } from './database/config';
import { user } from './routes/auth';

config();

const app: Express = express();

dbConnection();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use('/api/auth', user);

/* app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
}); */
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${process.env.PORT}`);
});
