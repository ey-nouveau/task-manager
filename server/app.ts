import cors from 'cors';
import express, { type Express, Request, Response } from 'express';
import { dbClient } from './db-client.ts';

const app: Express = express();
const port = 3002;
app.use(cors());
app.use(express.json());

app.get('/api/tasks', async (req: Request, res: Response) => {
  try {
    const { data, error } = await dbClient
      .from('tasks')
      .select('*');
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

app.post('/api/tasks', async (req: Request, res: Response) => {
  try {
    const { title, status, description, assigned_to } = req.body;
    
    const { data, error } = await dbClient
      .from('tasks')
      .insert([
        { 
          title, 
          status: status || 'todo', 
          description: description || '',
          assigned_to: assigned_to || null 
        }
      ])
      .select()
      .single();
      
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

app.put('/api/tasks/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const { data, error } = await dbClient
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

app.delete('/api/tasks/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await dbClient
      .from('tasks')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});