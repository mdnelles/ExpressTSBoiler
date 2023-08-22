import fs from 'fs-extra';
import Sequelize from 'sequelize';
import path from 'path';
import prettier from 'prettier';
import { db } from '../../config/dbconfig';

export async function createModelsMySQL (dbname: any, res: any) {
  try {
    let indexFile = '';
    const tableNames = await db.sequelize.query(`SHOW TABLES FROM ${dbname} `, {
      type: Sequelize.QueryTypes.SHOWTABLES
    });

    for (const tableName of tableNames) {
      const columns = await db.sequelize.query(
        `SHOW COLUMNS FROM ${tableName}`
      );

      const upper = tableName.charAt(0).toUpperCase() + tableName.slice(1);
      indexFile +=
        'export { default as ' + upper + ' } from \'./' + tableName + '\';\n';
      const MODEL_START = `
      import Sequelize from 'sequelize';
      import { db } from '../config/dbconfig';
      
      const ${upper} = db.sequelize.define('${tableName}', {
      `;

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
        const type = DATA_TYPE_MAP[dataType.split('(')[0]] ?? 'STRING';

        const properties = [`type: Sequelize.${type},allowNull: false`];

        if (isPrimaryKey) properties.push('primaryKey: true');
        if (autoIncrement) properties.push('autoIncrement: true');

        modelCode += `  ${columnName}: {
        ${properties.join(',\n  ')}
      },
      `;
      }

      modelCode += ` },
      {
        timestamps: false,
     } 
     );export default ${upper}; `;

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
      const indexPath = path
        .resolve(__dirname, '../../src/models', 'index.ts')
        .replace('/dist', '');
      fs.writeFileSync(indexPath, indexFile);

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
