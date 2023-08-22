import { type ModelsIndex } from 'src/types/models';

export const firstToUpper = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const onlyFirstIsUpper = (str?: string) => {
  if (!str) return '';
  const returnString = str.toString().toLocaleLowerCase();
  return (
    returnString.toString().charAt(0).toUpperCase() + returnString.slice(1)
  );
};

export const tableExists = async (tableName: string, models: ModelsIndex) => {
  return !!models[onlyFirstIsUpper(tableName)];
};

export const noModel = (tableName: string) => {
  return `Error Model ${onlyFirstIsUpper(tableName)} does not exist.`;
};
