import * as dotenv from 'dotenv';
dotenv.config();

import app from './server';
import config from './config';

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server is Listening on PORT: ${PORT}`);
});
