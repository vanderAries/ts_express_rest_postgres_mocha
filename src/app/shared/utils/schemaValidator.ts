import Ajv, { type Schema, type DefinedError } from 'ajv';

const ajv = new Ajv();

function validateSchema(body: unknown, schema: Schema): DefinedError[] | null {
  const validate = ajv.compile(schema);
  if (!validate(body)) {
    return validate.errors as DefinedError[];
  }
  return null;
}

export default validateSchema;
