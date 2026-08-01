import "dotenv/config";
import cors from 'cors';
import express, { type Express, type Request } from 'express';
import { dbClient } from './db-client.ts';

const app: Express = express();
const port = 3002;

app.use(cors());
app.use(express.json());

// Export app for serverless use
export default app;

app.get('/api/tasks', async (req, res) => {
  const { data, error } = await dbClient
    .from('tasks')
    .select('*');

  if (error) {
    throw error;
  }

  res.status(200).send(data);
});

app.post('/api/tasks', async (req: Request<{}, {}, { createdBy: string; status: 'todo' | 'in-progress' | 'done'; assignedTo?: string; title: string, description: string; }>, res) => {
  const { createdBy, assignedTo = createdBy, status = 'todo', title, description } = req.body;

  const { data, error } = await dbClient
    .from('tasks')
    .insert({
      created_by: createdBy,
      assigned_to: assignedTo,
      status,
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

app.delete('/api/tasks/:taskId', async (req, res) => {
  const { taskId } = req.params;

  const { error } = await dbClient
    .from('tasks')
    .delete()
    .eq('id', taskId);

  if (error) {
    throw error;
  }

  res.status(204);
});

app.put('/api/tasks/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const { title, status, description } = req.body;

  const updatedData: { status?: string; title?: string; description?: string; } = {};

  if (title) {
    updatedData.title = title;
  }

  if (description) {
    updatedData.description = description;
  }

  if (status) {
    updatedData.status = status;
  }

  const { error } = await dbClient
    .from('tasks')
    .update(updatedData)
    .eq('id', taskId);

  if (error) {
    throw error;
  }

  res.status(204);
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
