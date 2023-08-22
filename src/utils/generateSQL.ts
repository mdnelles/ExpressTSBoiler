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

export const generateSelectQuery = (table: any, field: any, value: any) => {
  const query = `SELECT * FROM ${table} WHERE ${field} = '${value}' LIMIT 1;`;
  console.log(query);
  return query;
};

export const selectMulitpleFieldsQuery = (
  table: string,
  attribute: any,
  limit: number,
  likeOperator: boolean
) => {
  const keys = Object.keys(attribute);
  const vals = Object.values(attribute);
  const whereClause = likeOperator
    ? keys.map((key, index) => `${key} LIKE '%${vals[index]}%'`).join(' AND ')
    : keys.map((key, index) => `${key} = '${vals[index]}'`).join(' AND ');

  const query = `SELECT * FROM ${table} WHERE ${whereClause} LIMIT ${limit};`;
  return query;
};

// pass in an object and create a delete query given the atttributes and respective values use quotes for all valuese
export const generateDeleteQuery = (table: any, field: any, value: any) => {
  const query = `DELETE FROM ${table} WHERE ${field} = '${value}'`;
  console.log(query);
  return query;
};

type SQLFunction = 'AVG' | 'SUM' | 'MIN' | 'MAX' | 'COUNT';

export function generateSQLFunctionQuery (
  functionName: SQLFunction,
  columnName: string,
  alias?: string,
  groupByColumn?: string
): string {
  // Validate if the provided function is valid
  if (!['AVG', 'SUM', 'MIN', 'MAX', 'COUNT'].includes(functionName)) {
    throw new Error('Invalid SQL function provided.');
  }

  // Start building the query string
  let queryString = `SELECT ${functionName}(${columnName})`;

  // If an alias is provided, add it to the query
  if (alias) {
    queryString += ` AS ${alias}`;
  }

  // Assuming a table name is needed for the FROM clause. Placeholder used here.
  queryString += ' FROM your_table_name';

  // If a groupByColumn is provided, add a GROUP BY clause
  if (groupByColumn) {
    queryString += ` GROUP BY ${groupByColumn}`;
  }

  // Return the constructed query string
  return queryString;
}

export function generateJoinQuery (
  table1: string,
  table2: string,
  table1Column: string,
  table2Column: string
): string {
  return `SELECT * FROM ${table1} INNER JOIN ${table2} ON ${table1}.${table1Column} = ${table2}.${table2Column}`;
}
