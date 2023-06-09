// import fs from 'fs-extra';
// //const env = require('dotenv').config().parsed;

// // Import the SQLite database instance from ./config
// import { db } from '../db/config';

// // Define a function to create Sequelize models based on table columns
// export async function createModelsSQLite(dbname: any, res: any) {
//   // Retrieve all table names from the database
//   const tableNames = await new Promise<string[]>((resolve, reject) => {
//     db.all(
//       "SELECT name FROM sqlite_master WHERE type='table'",
//       (err: any, rows: any) => {
//         if (err) {
//           res.json({ msg: `failed (1) on ${dbname}`, status: 500, err });
//           reject(err);
//         } else {
//           const names = rows.map((row: any) => row.name);
//           resolve(names);
//         }
//       }
//     );
//   });
//   console.log(tableNames);
//   // Iterate through each table name
//   for (const tableName of tableNames) {
//     // Retrieve column information for the current table
//     const columns = await new Promise<any[]>((resolve, reject) => {
//       db.all(`PRAGMA table_info(${tableName})`, (err: any, rows: any) => {
//         if (err) {
//           res.json({ msg: `failed (2) on ${dbname}`, status: 500, err });
//           reject(err);
//         } else {
//           resolve(rows);
//         }
//       });
//     });

//     let upper = tableName.charAt(0).toUpperCase() + tableName.slice(1);

//     let modelCode = `import Sequelize from "sequelize";
//    import { dbconn } from '../config';

//    export const ${upper} = dbconn.sequelize.define(
//     "${tableName}",
//     {
//       `;

//     // Define the Sequelize model based on the column information

//     const pkTrue = '\n\t\t\t\tprimaryKey:true,';
//     const aiTrue = '\n\t\t\t\tautoIncrement: true,';

//     for (const column of columns) {
//       const columnName = column.name;
//       const dataType = column.type;
//       const isPrimaryKey = column.pk === 1;
//       const autoIncrement = column.pk === 1 && column.type === 'INTEGER';

//       // Map database data types to Sequelize data types
//       let typ: any;

//       if (dataType.includes('varchar')) {
//         typ = 'STRING';
//       } else if (dataType.includes('int')) {
//         typ = 'INTEGER';
//       } else if (dataType.includes('float')) {
//         typ = 'FLOAT';
//       } else if (dataType.includes('date')) {
//         typ = 'DATEONLY';
//       } else if (dataType.includes('boolean')) {
//         typ = 'BOOLEAN';
//       } else {
//         typ = 'STRING';
//       }

//       modelCode += `    ${columnName}: {
//         type:  Sequelize.${typ}, ${isPrimaryKey ? pkTrue : ''} ${
//         autoIncrement ? aiTrue : ''
//       }
//         },
//       `;
//     }

//     modelCode += ` }); `;

//     // Define the file path to write the model file
//     const filePath = `./src/routes/db/models/${tableName}.ts`; // Modify the path as needed

//     // Write the model code to the file
//     fs.writeFileSync(filePath, modelCode);

//     console.log(`Created Sequelize model for table: ${tableName}`);
//   }
// }
