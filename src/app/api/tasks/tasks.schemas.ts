import { type JSONSchemaType } from 'ajv';
import { type TaskRequestBody } from './tasks.models';

const taskSchema: JSONSchemaType<TaskRequestBody> = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    description: { type: 'string', nullable: true },
    category: { type: 'string', enum: ['work', 'home'] },
    state: {
      type: 'string',
      enum: ['todo', 'active', 'finished'],
      nullable: true,
    },
  },
  required: ['name', 'category'],
  additionalProperties: false,
};

export default taskSchema;
