import type express from 'express';
import * as fs from 'fs-extra';

const getData = async (location: string) => {
  let data = '';
  try {
    data = await fs.readFile(location, 'utf8');
  } catch (error) {
    console.log(error);
  }
  return data;
};

export const insertOne = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let { newData, filePath = './src/data/cars.txt' } = req.body;

    // replace single quotes with double quotes
    newData = newData.replace(/'/g, '"');
    let data: any = await getData(filePath);

    // enclose the attributes in double quotes
    newData = newData.replace(/(\w+):/g, '"$1":');
    newData = typeof newData === 'object' ? newData : JSON.parse(newData);

    const parsedData = [...JSON.parse(data), newData];
    data = JSON.stringify(parsedData, null, 2);

    await fs.writeFile(filePath, data);

    res.json({ msg: 'success', err: false, status: 200 });
  } catch (error) {
    console.error(error);
    res.json({
      msg: 'error',
      err: true,
      status: 500,
      error: 'Something went wrong'
    });
  }
};

export const selectAll = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { filePath = './src/data/cars.txt' } = req.body;
    const data: any = await getData(filePath);
    res.json({ msg: 'success', err: false, status: 200, data });
  } catch (error) {
    console.error(error);
    res.json({
      msg: 'error',
      err: true,
      status: 500,
      error: 'Something went wrong'
    });
  }
};

export const deleteOne = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id, filePath = './src/data/cars.txt' } = req.body;

    let data = await getData(filePath);
    let parsedData = JSON.parse(data);
    parsedData = parsedData.filter(
      (item: any) => parseInt(item.id) !== parseInt(id)
    );
    data = JSON.stringify(parsedData, null, 2);
    await fs.writeFile(filePath, data);

    res.json({ msg: 'success', err: false, status: 200, data });
  } catch (error) {
    console.error(error);
    res.json({ msg: 'error', err: true, status: 500, error });
  }
};

export const updateOne = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id, filePath = './src/data/cars.txt' } = req.body;
    let { newData } = req.body;

    let data: any = await getData(filePath);

    newData = newData.replace(/'/g, '"');
    newData = newData.replace(/(\w+):/g, '"$1":');
    newData = typeof newData === 'object' ? newData : JSON.parse(newData);

    let parsedData = JSON.parse(data);
    parsedData = parsedData.filter(
      (item: any) => parseInt(item.id) !== parseInt(id)
    );

    parsedData = [...parsedData, newData];
    data = JSON.stringify(parsedData, null, 2);
    await fs.writeFile(filePath, data);

    res.json({ msg: 'success', err: false, status: 200, data });
  } catch (error) {
    console.error(error);
    res.json({ msg: 'error', err: true, status: 500, error });
  }
};
