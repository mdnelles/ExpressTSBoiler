// Generate dummy data based on the data types defined in the model
export const generateDummyData = (fields: any) => {
  const dummyItem: any = {};
  fields.forEach((field: any) => {
    if (field.Field === 'ID') {
      dummyItem.ID = '';
    } else {
      const dataType = field.Type;
      //console.log(tableName + '.' + dataType + ' ' + field.Field);

      // Add logic to generate dummy data based on different data types
      //switch (dataType) {
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
          dummyItem[field.Field] = new Date();
          break;
        case dataType.includes('datetime'):
          dummyItem[field.Field] = new Date();
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
