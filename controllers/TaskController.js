import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import { TaskModel } from '../models/TaskModel';

class TaskController {
  async index(req, res) {
    try {
      const tasks = await TaskModel.find({}).exec();

      res.status(200).json({
        status: 'success',
        data: tasks
      })

    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error
      })
    }
  }

  async create(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({
          status: 'error',
          errors: errors.array()
        });
        return;
      }

      const data = {
        name: req.body.name,
        status: req.body.status,
        project_id: req.params.id
      }

      const task = await TaskModel.create(data);

      res.status(200).json({
        status: 'success',
        data: task
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error
      })
    }
  }

  async update(req, res) {
    try {
      const taskID = req.params.id;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({
          status: 'error',
          errors: errors.array()
        });
        return;
      }

      const data = {
        name: req.body.name,
        status: req.body.status
      }

      if (!mongoose.Types.ObjectId.isValid(taskID)) {
        res.status(400).json({
          status: 'error',
          message: 'Task ID is invalid.'
        });
        return;
      }

      await TaskModel.updateOne({ _id: taskID }, data);

      res.status(200).json({
        status: 'success',
        message: `Task with ${taskID} ID updated successfully.`
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error
      })
    }
  }

  async delete(req, res) {
    try {
      const taskID = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(taskID)) {
        res.status(400).json({
          status: 'error',
          message: 'Task ID is invalid.'
        });
        return;
      }

      await TaskModel.deleteOne({ _id: taskID });

      res.status(200).json({
        status: 'success',
        message: `Task with ${taskID} ID deleted successfully.`
      });

    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error
      })
    }
  }
}

export const TaskCtrl = new TaskController();