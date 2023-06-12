// Generate dummy data based on the data types defined in the model
export const generateDummyDataString = (fields: any) => {
  let cols = '';
  let vals = '';
  fields.forEach((field: any) => {
    // if (field.Field === 'ID' || field.Field === 'id') {
    if (field.Extra === 'auto_increment') {
      //str += ',';
    } else {
      const dataType = field.Type;

      // Add logic to generate dummy data based on different data types
      switch (true) {
        case dataType.includes('varchar'):
          vals += `"${generateRandomString(10)}",`;
          cols += `${field.Field},`;
          break;
        case dataType.includes('int'):
          vals += Math.floor(Math.random() * 100) + ',';
          cols += `${field.Field},`;
          break;
        case dataType.includes('float'):
          vals += Math.floor(Math.random() * 100) + ',';
          cols += `${field.Field},`;
          break;
        case dataType.includes('dateonly'):
          vals += `CAST('${new Date()
            .toISOString()
            .slice(0, 19)
            .replace('T', ' ')}' AS DATETIME),`;
          cols += `${field.Field},`;
          break;
        case dataType.includes('datetime'):
          vals += `CAST('${new Date()
            .toISOString()
            .slice(0, 19)
            .replace('T', ' ')}' AS DATETIME),`;
          cols += `${field.Field},`;
          break;
        case dataType.includes('boolean'):
          vals += true + ',';
          cols += `${field.Field},`;
          break;
        default:
          vals += '"default",';
          cols += `${field.Field},`;
          break;
      }
    }
  });
  return { vals: vals.slice(0, -1), cols: cols.slice(0, -1) };
};

export const generateDummyData = (fields: any) => {
  const dummyItem: any = {};
  fields.forEach((field: any) => {
    if (field.Field === 'ID') {
      dummyItem.ID = '';
    } else {
      const dataType = field.Type;

      // Add logic to generate dummy data based on different data types
      switch (true) {
        case dataType.includes('varchar'):
          dummyItem[field.Field] = generateRandomString(10);
          break;
        case dataType.includes('int'):
          dummyItem[field.Field] = Math.floor(Math.random() * 100);
          break;
        case dataType.includes('float'):
          dummyItem[field.Field] = Math.floor(Math.random() * 100);
          break;
        case dataType.includes('dateonly'):
          dummyItem[field.Field] = `CAST('${new Date()
            .toISOString()
            .slice(0, 19)
            .replace('T', ' ')}' AS DATETIME),`;
          break;
        case dataType.includes('datetime'):
          dummyItem[field.Field] = `CAST('${new Date()
            .toISOString()
            .slice(0, 19)
            .replace('T', ' ')}' AS DATETIME),`;
          break;
        case dataType.includes('boolean'):
          dummyItem[field.Field] = true;
          break;
        default:
          dummyItem[field.Field] = 'default';
          break;
      }
    }
  });
  return dummyItem;
};

const generateRandomString = (length: number) => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};
