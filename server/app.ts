import cors from 'cors';
import express, { type Express } from 'express';
import { dbClient } from './db-client.ts';

const app: Express = express();
const port = 3002;
app.use(cors());


app.get('/api/tasks', async () => {
  const { data, error } = await dbClient
    .from('tasks')
    .select('*');
  if (error) {
    throw error;
  }

  console.log(data);

  return data;
});

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
});