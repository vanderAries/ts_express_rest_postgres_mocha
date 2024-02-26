import Ajv, { type Schema } from 'ajv';
import { type Request, type Response, type NextFunction } from 'express';

const ajv = new Ajv();

function validateSchema(schema: Schema) {
  return (req: any, _res: Response, next: NextFunction) => {
    const validate = ajv.compile(schema);
    if (!validate(req.body)) {
      req.validationError = validate.errors;
    }
    next();
  };
}

export default validateSchema;
