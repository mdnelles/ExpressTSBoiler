import sqlite3 from 'sqlite3';
import { Sequelize, DataTypes, Model } from 'sequelize';

// Import the SQLite database instance from ./config
import { db, path } from '../db/config';

// Set up Sequelize with the SQLite database instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path // Replace with the actual path to your SQLite database file
});

// Define a function to create Sequelize models based on table columns
async function createModels() {
  // Retrieve all table names from the database
  const tableNames = await new Promise<string[]>((resolve, reject) => {
    db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const names = rows.map((row: any) => row.name);
        resolve(names);
      }
    });
  });

  // Iterate through each table name
  for (const tableName of tableNames) {
    // Retrieve column information for the current table
    const columns = await new Promise<any[]>((resolve, reject) => {
      db.all(`PRAGMA table_info(${tableName})`, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    // Define the Sequelize model based on the column information
    const modelAttributes: { [key: string]: any } = {};

    for (const column of columns) {
      const columnName = column.name;
      const dataType = column.type;

      // Map database data types to Sequelize data types
      let sequelizeDataType: any;

      if (dataType.includes('varchar')) {
        sequelizeDataType = DataTypes.STRING;
      } else if (dataType.includes('int')) {
        sequelizeDataType = DataTypes.INTEGER;
      } else if (dataType.includes('float')) {
        sequelizeDataType = DataTypes.FLOAT;
      } else if (dataType.includes('date')) {
        sequelizeDataType = DataTypes.DATEONLY;
      } else if (dataType.includes('boolean')) {
        sequelizeDataType = DataTypes.BOOLEAN;
      } else {
        sequelizeDataType = DataTypes.STRING;
      }

      modelAttributes[columnName] = sequelizeDataType;
    }

    // Create the Sequelize model for the current table
    class DynamicModel extends Model {}
    DynamicModel.init(modelAttributes, {
      sequelize,
      modelName: tableName,
      tableName,
      timestamps: false
    });

    // Sync the model with the database (optional)
    await DynamicModel.sync();

    console.log(`Created Sequelize model for table: ${tableName}`);
  }
}

// Run the createModels function to create Sequelize models
createModels()
  .then(() => {
    console.log('Sequelize models created successfully!');
  })
  .catch((error) => {
    console.error('Error creating Sequelize models:', error);
  });
