import { v4 as uuidv4 } from 'uuid';

let todos = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const newTodo = {
      id: uuidv4(),
      title: req.body.title,
      completed: req.body.completed,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  } else if (req.method === 'GET') {
    res.status(200).json(todos);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    todos = todos.filter((todo) => todo.id !== id);
    res.status(200).json({ id });
  } else {
    res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
