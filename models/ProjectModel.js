import { model, Schema } from 'mongoose';

const ProjectSchema = new Schema({
  name: {
    required: true,
    type: String
  }
})

export const ProjectModel = model('Project', ProjectSchema);