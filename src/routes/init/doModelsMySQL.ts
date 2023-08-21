import fs from 'fs-extra';
import Sequelize from 'sequelize';
import path from 'path';
import prettier from 'prettier';
import { db } from '../../config/dbconfig';

export async function createModelsMySQL (dbname: any, res: any) {
  try {
    const tableNames = await db.sequelize.query(`SHOW TABLES FROM ${dbname} `, {
      type: Sequelize.QueryTypes.SHOWTABLES
    });

    for (const tableName of tableNames) {
      const columns = await db.sequelize.query(
        `SHOW COLUMNS FROM ${tableName}`
      );

      const upper = tableName.charAt(0).toUpperCase() + tableName.slice(1);
      const MODEL_START = `import Sequelize from "sequelize";
import { db } from '../config/dbconfig';

export const ${upper} = db.sequelize.define("${tableName}", {`;

      let modelCode = MODEL_START;

      const DATA_TYPE_MAP: Record<string, string> = {
        varchar: 'STRING',
        int: 'INTEGER',
        float: 'FLOAT',
        date: 'DATEONLY',
        boolean: 'BOOLEAN'
      };

      for (const column of columns[0]) {
        const { Field: columnName, Type: dataType, Key, Extra } = column;
        const isPrimaryKey = Key === 'PRI';
        const autoIncrement = Extra === 'auto_increment' && isPrimaryKey;
        const type = DATA_TYPE_MAP[dataType.split('(')[0]] || 'STRING';

        modelCode += `  ${columnName}: {
          type: Sequelize.${type},
          ${isPrimaryKey ? 'primaryKey: true,' : ''}
          ${autoIncrement ? 'autoIncrement: true,' : ''}
          allowNull: false,
      },
      `;
      }

      modelCode += ` },
      {
        timestamps: false,
     }); `;

      const filePath = path
        .resolve(__dirname, '../../src/models', `${tableName}.ts`)
        .replace('/dist', '');

      try {
        const formattedCode = prettier.format(modelCode, {
          parser: 'typescript',
          singleQuote: true
        });
        fs.writeFileSync(filePath, formattedCode);
      } catch (err) {
        console.error(`Error writing file for table: ${tableName}`, err);
      }

      console.log(`Created Sequelize model for table: ${tableName}`);
    }

    res.json({
      msg: `Created Sequelize model for table: ${JSON.stringify(tableNames)}`,
      err: false,
      status: 200
    });
  } catch (error) {
    console.error('Error creating Sequelize models:', error);
    res.json({ msg: 'Error', err: true, error, status: 500 });
  }
}
