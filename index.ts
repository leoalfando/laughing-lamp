/* eslint-disable no-console */
import * as express from 'express';
import Packer from './src/service/Packer'
global.__basedir = __dirname;

const app = express();
app.get('/api/:filepath', async (req, res, next)=> {
  const filePath = req?.params?.filepath;
  const fullPath = __dirname + `/resources/${filePath}`
  const packer = new Packer(fullPath);
  await packer.loadFile();
  res.status(200).send(packer.fileContent);
});

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);
