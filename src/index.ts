import express from 'express';
import routes from './routes/index';
import exp = require("constants");
const app = express();
const port = 3000;

app.use('/api/images', routes);
app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});
export default app;
