import "dotenv/config";
import cors from 'cors';
import express, { type Express, type Request } from 'express';
import { dbClient } from './db-client.ts';

const app: Express = express();
const port = 3002;

app.use(cors());
app.use(express.json());


app.get('/api/tasks', async (req, res) => {
  const { data, error } = await dbClient
    .from('tasks')
    .select('*');

  if (error) {
    throw error;
  }

  res.status(200).send(data);
});

app.post('/api/tasks', async (req: Request<{}, {}, { createdBy: string; assignedTo?: string; title: string, description: string; }>, res) => {
  const { createdBy, assignedTo = createdBy, title, description } = req.body;

  const { data, error } = await dbClient
    .from('tasks')
    .insert({
      created_by: createdBy,
      assigned_to: assignedTo,
      status: 'Created',
      title,
      description
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  res.status(200).send(data);
});


app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
});