export const requiredValidator = (fields) => {
  return values => {
    return fields.reduce((acc, field) => {
      if (!values[field]) acc[field] = 'Required';
      return acc;
    }, {});
  }
}