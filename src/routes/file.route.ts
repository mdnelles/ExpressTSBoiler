import type express from 'express';

let data = [
  { id: 1, name: 'Ford', year: 2025 },
  { id: 2, name: 'Chevy', year: 2025 },
  { id: 3, name: 'Tesla', year: 2020 },
  { id: 4, name: 'KIA', year: 2025 },
  { id: 5, name: 'Honda', year: 2019 },
  { id: 7, name: 'Nissan', year: 2018 }
];

export const insertOne = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let { newData } = req.body;

    // replace single quotes with double quotes
    newData = newData.replace(/'/g, '"');

    // enclose the attributes in double quotes
    newData = newData.replace(/(\w+):/g, '"$1":');
    console.log(newData);
    data.push(JSON.parse(newData));

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

export const selectAll = async (_: express.Request, res: express.Response) => {
  try {
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
    const { id } = req.body;
    console.log(id);
    data = data.filter((item: any) => parseInt(item.id) !== parseInt(id));
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
    const { id } = req.body;
    let { newData } = req.body;

    newData = newData.replace(/'/g, '"');
    // enclose the attributes in double quotes
    newData = newData.replace(/(\w+):/g, '"$1":');

    data = data.filter((item: any) => parseInt(item.id) !== parseInt(id));
    data.push(JSON.parse(newData));
    res.json({ msg: 'success', err: false, status: 200, data });
  } catch (error) {
    console.error(error);
    res.json({ msg: 'error', err: true, status: 500, error });
  }
};
