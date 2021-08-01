/* eslint-disable no-console */
import * as express from 'express';
import Packer from './src/service/Packer'

const app = express();
const packer = new Packer();
app.get('/api/:fileName', async (req, res, next)=> {
  const fileName = req?.params?.fileName;
  const result = await packer.resolveContent(fileName);
  res.status(200).send(result);
});

app.listen(3000, () =>
  console.log('listening on port 3000!'),
);
