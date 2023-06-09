import fs from 'fs-extra';
import Sequelize from 'sequelize';
import path from 'path';

// Import the SQLite database instance from ./config
import { db } from '../../db/config';

// Define a function to create Sequelize models based on table columns
export async function createModelsMySQL (dbname: any, res: any) {
  // Retrieve all table names from the database
  try {
    // Retrieve all table names from the database
    const tableNames = await db.sequelize.query(`SHOW TABLES FROM ${dbname} `, {
      type: Sequelize.QueryTypes.SHOWTABLES
    });

    // Iterate through each table name
    tableNames.map(async (tableName: any) => {
      // Retrieve column information for the current table
      const columns = await db.sequelize.query(
        `SHOW COLUMNS FROM ${tableName}`
      );
      const upper = tableName.charAt(0).toUpperCase() + tableName.slice(1);

      let modelCode = `import Sequelize from "sequelize";
   import { db } from '../config';
   
   export const ${upper} = db.sequelize.define(
    "${tableName}",
    {
      `;

      // Define the Sequelize model based on the column information

      const pkTrue = '\n\t\t\t\t\tprimaryKey: true,';
      const aiTrue = '\n\t\t\t\t\tautoIncrement: true,';

      for (const column of columns[0]) {
        const columnName = column.Field;
        const dataType = column.Type;
        const isPrimaryKey = column.Key === 'PRI';
        const autoIncrement =
          column.Extra === 'auto_increment' && column.Key === 'PRI';

        // Map database data types to Sequelize data types
        let typ: any;

        if (dataType.includes('varchar')) {
          typ = 'STRING';
        } else if (dataType.includes('int')) {
          typ = 'INTEGER';
        } else if (dataType.includes('float')) {
          typ = 'FLOAT';
        } else if (dataType.includes('date')) {
          typ = 'DATEONLY';
        } else if (dataType.includes('boolean')) {
          typ = 'BOOLEAN';
        } else {
          typ = 'STRING';
        }

        modelCode += `  ${columnName}: {
          type: Sequelize.${typ}, ${isPrimaryKey ? pkTrue : ''} ${
          autoIncrement ? aiTrue : ''
        }
        allowNull: false,
      },
      `;
      }

      modelCode += ` },
      {
        timestamps: false,
     }); `;

      // Define the file path to write the model file
      const filePath = path
        .resolve(__dirname, '../../src/db/models', `${tableName}.ts`)
        .toString()
        .replace('/dist', '');
      console.log('......filePath');
      console.log(filePath);
      try {
        fs.writeFileSync(filePath, modelCode);
      } catch (err) {
        console.error(err);
      }

      console.log(`Created Sequelize model for table: ${tableName}`);
    });
    res.json({
      msg: `Created Sequelize model for table: ${JSON.stringify(tableNames)}`,
      err: false,
      status: 200
    });
  } catch (error) {
    console.log(error);
    res.json({ msg: 'Error', err: true, error, status: 500 });
  }
}
