import { Sequelize, DataTypes, Model, QueryTypes } from 'sequelize';

// Set up Sequelize with your database credentials
const sequelize = new Sequelize(
  'your_database_name',
  'your_username',
  'your_password',
  {
    host: 'localhost',
    dialect: 'mysql' // or any other database dialect you're using
  }
);

// Define a function to create Sequelize models based on table columns
async function createModels() {
  // Retrieve all table names from the database
  const tableNames = await sequelize.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'your_database_name'",
    { type: QueryTypes.SELECT }
  );

  // Iterate through each table name
  for (const tableNameObj of tableNames) {
    let tmp: any = tableNameObj;
    const tableName: any = tmp.table_name;

    // Retrieve column information for the current table
    const columns = await sequelize.query(
      `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '${tableName}'`,
      { type: QueryTypes.SELECT }
    );

    // Define the Sequelize model based on the column information
    const modelAttributes: { [key: string]: any } = {};

    for (const column of columns) {
      let tmp: any = column;
      const columnName = tmp.column_name;
      const dataType = tmp.data_type;

      // Map database data types to Sequelize data types
      let sequelizeDataType: any;

      switch (dataType) {
        case 'varchar':
          sequelizeDataType = DataTypes.STRING;
          break;
        case 'int':
          sequelizeDataType = DataTypes.INTEGER;
          break;
        case 'float':
          sequelizeDataType = DataTypes.FLOAT;
          break;
        case 'date':
          sequelizeDataType = DataTypes.DATEONLY;
          break;
        case 'boolean':
          sequelizeDataType = DataTypes.BOOLEAN;
          break;
        // Add more data type mappings as needed for your database
        default:
          sequelizeDataType = DataTypes.STRING;
          break;
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
