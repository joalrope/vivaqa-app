import express, { Express  } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { dbConnection } from './database/config';
import { userRouter } from './routes/auth';
import { questionnaireRouter } from './routes/questionnaire';

config();

const app: Express = express();

dbConnection();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use('/api/auth', userRouter);
app.use('/api/questionnaire', questionnaireRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`⚡️[server]: Servidor corriendo en https://localhost:${process.env.PORT}`);
});
