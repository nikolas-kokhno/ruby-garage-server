import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import { ProjectModel } from '../models/ProjectModel';

class ProjectController {
  async index(req, res) {
    try {
      const project = await ProjectModel.find({}).exec();

      res.status(200).json({
        status: 'success',
        data: project
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
        name: req.body.name
      }
      const project = await ProjectModel.create(data);

      res.status(200).json({
        status: 'success',
        data: project
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
      const projectID = req.params.id;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({
          status: 'error',
          errors: errors.array()
        });
        return;
      }

      const data = {
        name: req.body.name
      }

      if (!mongoose.Types.ObjectId.isValid(projectID)) {
        res.status(400).json({
          status: 'error',
          message: 'Project ID is invalid.'
        });
        return;
      }

      await ProjectModel.updateOne({ _id: projectID }, { name: data.name });

      res.status(200).json({
        status: 'success',
        message: `Project with ${projectID} ID updated successfully.`
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
      const projectID = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(projectID)) {
        res.status(400).json({
          status: 'error',
          message: 'Project ID is invalid.'
        });
        return;
      }

      await ProjectModel.deleteOne({ _id: projectID });

      res.status(200).json({
        status: 'success',
        message: `Project with ${projectID} ID deleted successfully.`
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error
      })
    }
  }
}

export const ProjectCtrl = new ProjectController();