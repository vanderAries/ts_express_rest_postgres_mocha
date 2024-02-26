import Ajv, { type JSONSchemaType } from 'ajv';
import { type TaskRequest, type TaskResponse } from './tasks.models';

const ajv = new Ajv();

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

const validate = ajv.compile(taskInputSchema);

const data = {
  foo: 1,
  bar: 'abc',
};

if (validate(data)) {
  // data is MyData here
  console.log(data.foo);
} else {
  console.log(validate.errors);
}
