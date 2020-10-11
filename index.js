import express from 'express';
import cors from 'cors';
import './core/db';
import { ProjectCtrl } from './controllers/ProjectController';
import { TaskCtrl } from './controllers/TaskController';
import { projectValidations } from './validations/project';
import { taskValidations } from './validations/task';

const app = express();
app.use(cors());
const PORT = process.env.PORT || 7777;

app.use(express.json());

app.get('/projects', ProjectCtrl.index);
app.post('/projects', projectValidations, ProjectCtrl.create);
app.patch('/projects/:id', projectValidations, ProjectCtrl.update);
app.delete('/projects/:id', ProjectCtrl.delete);

app.get('/tasks', TaskCtrl.index);
app.post('/project/:id/tasks', taskValidations, TaskCtrl.create);
app.patch('/tasks/:id', taskValidations, TaskCtrl.update);
app.delete('/tasks/:id', TaskCtrl.delete);

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING - ${PORT} port`);
});