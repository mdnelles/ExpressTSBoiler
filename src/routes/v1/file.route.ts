import express from 'express';
import fs from 'fs-extra';

const dataFile = './src/data/DataFile.txt';

export const insertOne = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { newData } = req.body;
    // read in the data from DataFile.txt
    let data = fs.readFileSync(dataFile, 'utf8');
    // parse the data into a JSON object
    let dataObj = JSON.parse(data);
    // add the new data
    dataObj.push(newData);
    // write the data back to the file
    fs.writeFileSync(dataFile, JSON.stringify(dataObj));

    res.json({ msg: 'success', err: false, status: 200 });
  } catch (error) {
    res.json({ msg: 'error', err: true, status: 500, error });
  }
};

export const selectAll = async (res: express.Response) => {
  try {
    let data = fs.readFileSync(dataFile, 'utf8');
    res.json({ msg: 'success', err: false, status: 200, data });
  } catch (error) {
    console.error(error);
    res.json({ msg: 'error', err: true, status: 500, error });
  }
};

export const deleteOne = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.body;
    const data = fs.readFileSync(dataFile, 'utf8');
    let dataObj = JSON.parse(data);
    dataObj = dataObj.filter((item: any) => item.id !== id);
    fs.writeFileSync(dataFile, JSON.stringify(dataObj));

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
    const { id, newData } = req.body;
    const data = fs.readFileSync(dataFile, 'utf8');
    let dataObj = JSON.parse(data);
    dataObj = dataObj.filter((item: any) => item.id !== id);
    dataObj.push(newData);
    fs.writeFileSync(dataFile, JSON.stringify(dataObj));
    res.json({ msg: 'success', err: false, status: 200, data });
  } catch (error) {
    console.error(error);
    res.json({ msg: 'error', err: true, status: 500, error });
  }
};
