// Generate dummy data based on the data types defined in the model
export const generateDummyData = (fields: any) => {
  const dummyItem: any = {};
  fields.forEach((field: any) => {
    if (field !== 'ID') {
      const dataType = field.Type;

      // Add logic to generate dummy data based on different data types
      //switch (dataType) {
      switch (true) {
        case dataType.includes('string'):
          dummyItem[field] = generateRandomString(10);
          break;
        case dataType.includes('integer'):
          dummyItem[field] = Math.floor(Math.random() * 100);
          break;
        case dataType.includes('float'):
          dummyItem[field] = Math.floor(Math.random() * 100);
          break;
        case dataType.includes('dateonly'):
          dummyItem[field] = new Date();
          break;
        case dataType.includes('boolean'):
          dummyItem[field] = true;
          break;
        // Add more cases for other data types as needed
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
