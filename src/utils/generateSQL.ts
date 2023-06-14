// pass in an object and create an insert query given the atttributes and respective values use quotes for all values
export const generateInsertQuery = (table: any, values: any) => {
  const keys = Object.keys(values);
  const vals = Object.values(values);
  const query = `INSERT INTO ${table} (${keys.join(',')}) VALUES (${vals
    .map((val) => `'${val}'`)
    .join(',')})`;
  console.log(query);
  return query;
};

// pass in an object and create an update query given the atttributes and respective values use quotes for all values
export const generateUpdateQuery = (
  table: any,
  updateField: any,
  updateValue: any,
  whereCondition: any
) => {
  const query = `UPDATE ${table} SET ${updateField} = '${updateValue}' WHERE ${whereCondition}`;
  console.log(query);
  return query;
};

// pass in an object and create a delete query given the atttributes and respective values use quotes for all valuese
export const generateDeleteQuery = (table: any, field: any, value: any) => {
  const query = `DELETE FROM ${table} WHERE ${field} = '${value}'`;
  console.log(query);
  return query;
};
