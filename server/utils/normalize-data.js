import { normalize, schema } from 'normalizr';

const objectSchema = new schema.Entity('data', {}, { idAttribute: '_id' });
const objectSchemaList = new schema.Array(objectSchema);

export const normalizeArray = data =>	normalize(data, objectSchemaList);
export const normalizeObject = data => normalize(data, objectSchema);