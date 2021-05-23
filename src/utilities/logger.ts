import express from 'express';
import exp = require('constants');

const logger = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  let params = req.params;
  console.log(params);
  next();
};
export default logger;
