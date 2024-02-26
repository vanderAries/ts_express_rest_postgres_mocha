import { type JSONSchemaType } from 'ajv';
import { type TaskRequest, type TaskResponse } from './tasks.models';

export const taskInputSchema: JSONSchemaType<TaskRequest> = {
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

export const taskResponseSchema: JSONSchemaType<TaskResponse> = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    description: { type: 'string', nullable: true },
    category: { type: 'string', enum: ['work', 'home'] },
    state: { type: 'string', enum: ['todo', 'active', 'finished'] },
  },
  required: ['id', 'name', 'category', 'state'],
  additionalProperties: false,
};
